<template>
  <span>
    <AlertBox v-if="loading_fail" :alert_text="alert_text"></AlertBox>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="tasks"
      @click:row="showDetails"
      sort-by="dead_line"
    >
      <template v-slot:top>
        <v-switch v-model="hideFinished" label="Hide finished tasks"></v-switch>
      </template>
      <template v-slot:item.dead_line="{ value, item }">
        <div class="d-flex justify-space-between">
          <span>{{ relativeTime(value) }}</span>
          <v-tooltip
            v-if="relativeHours(value) < 0 && item.status === 0"
            left
            color="error"
          >
            <template v-slot:activator="{ on }">
              <v-icon color="error" small v-on="on"> mdi-alert-circle </v-icon>
            </template>
            This task has missed deadline
          </v-tooltip>
          <v-tooltip
            v-else-if="relativeHours(value) < 48 && item.status === 0"
            left
            color="warning"
          >
            <template v-slot:activator="{ on }">
              <v-icon color="warning" small v-on="on">
                mdi-alert-circle
              </v-icon>
            </template>
            Deadline is less than 2 days away
          </v-tooltip>
        </div>
      </template>
      <template v-slot:item.status="{ value }">
        <v-icon color="white">
          {{ value ? "mdi-check" : "mdi-close" }}
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="detailsVisible" max-width="90%" width="fit-content">
      <TaskDetails
        :task="focused_task"
        @change="fetchTasks"
        @close="[fetchTasks(), (detailsVisible = false)]"
      />
    </v-dialog>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import api, { TaskData } from "../services/index";
import AlertBox from "./AlertBox.vue";
import TaskDetails from "./TaskDetails.vue";

export default defineComponent({
  props: {
    filter: { type: Number, required: false },
  },
  data: () => ({
    loading: true,
    hideFinished: false,

    tasks: [],
    loading_fail: false,
    alert_text: "",
    detailsVisible: false,
    focused_task: {} as TaskData,
  }),
  computed: {
    headers(): any {
      return [
        { text: "Task", value: "task" },
        { text: "Deadline", value: "dead_line", width: 200 },
        {
          text: "Finished?",
          value: "status",
          width: 100,
          align: "center",
          filter: this.statusFilter,
        },
      ];
    },
  },
  async created() {
    this.fetchTasks();
    api.getSpecializationsToCache();
  },
  methods: {
    async fetchTasks() {
      this.loading = true;
      api
        .getTasks()
        .then((response) => {
          if (this.filter) {
            this.tasks = response.data.filter((v: TaskData) => {
              return v.user_id === this.filter;
            });
            this.calculateStats();
          } else {
            this.tasks = response.data;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading_fail = true;
          this.loading = false;
          this.alert_text = err.message + ": Couldn't load data";
        });
    },
    calculateStats() {
      var total = this.tasks.length;
      var completed = this.tasks.reduce(
        (total, x: TaskData) => total + x.status,
        0
      );
      this.$emit("taskStats", { total: total, completed: completed });
    },
    showDetails(_: unknown, item: { item: TaskData }) {
      this.detailsVisible = true;
      this.focused_task = item.item;
    },
    relativeTime(timeString: string) {
      var duration = Date.parse(timeString) - Date.now();
      var inPast = duration < 0;
      duration = Math.abs(duration);
      const days = Math.floor(duration / (24 * 60 * 60 * 1000));
      duration = duration % (24 * 60 * 60 * 1000);
      const hours = Math.floor(duration / (60 * 60 * 1000));
      duration = duration % (60 * 60 * 1000);
      const minutes = Math.floor(duration / (60 * 1000));
      const stringified = days
        ? days + " days"
        : hours + " hours " + minutes + " minutes";
      return inPast ? stringified + " ago" : "in " + stringified;
    },
    relativeHours(timeString: string) {
      var duration = Date.parse(timeString) - Date.now();
      return duration / (1000 * 60 * 60);
    },
    statusFilter(v: number) {
      return !(v && this.hideFinished);
    },
  },
  components: { AlertBox, TaskDetails },
});
</script>
