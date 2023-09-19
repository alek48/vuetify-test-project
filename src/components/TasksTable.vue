<template>
  <span>
    <AlertBox v-if="loading_fail" :alert_text="alert_text"></AlertBox>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="tasks"
      @click:row="showDetails"
    >
      <template v-slot:item.dead_line="{ value }">
        {{ value }} ({{ relativeTime(value) }})
      </template>
    </v-data-table>
    <v-dialog v-model="detailsVisible" max-width="60%">
      <TaskDetails :task="focused_task" @change="fetchTasks" />
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
    headers: [
      { text: "Task", value: "task" },
      { text: "Deadline", value: "dead_line" },
      { text: "Status", value: "status" },
    ],
    tasks: [],
    loading_fail: false,
    alert_text: "",
    detailsVisible: false,
    focused_task: {} as TaskData,
  }),
  async created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      this.loading = true;
      api
        .getTasks()
        .then((response) => {
          if (this.filter) {
            this.tasks = response.data.filter((v: TaskData) => {
              console.log(typeof v.user_id);
              return v.user_id === this.filter;
            });
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
    showDetails(_: unknown, item: { item: TaskData }) {
      this.detailsVisible = true;
      this.focused_task = item.item;
    },
    relativeTime(timeString: string) {
      var duration = Date.parse(timeString) - Date.now();
      const days = Math.abs(Math.floor(duration / (24 * 60 * 60 * 1000)));
      duration = duration % (24 * 60 * 60 * 1000);
      const hours = Math.abs(Math.floor(duration / (60 * 60 * 1000)));
      duration = duration % (60 * 60 * 1000);
      const minutes = Math.abs(Math.floor(duration / (60 * 1000)));
      const stringified = days
        ? days + " days"
        : hours + " hours " + minutes + " minutes";
      return duration >= 0 ? "in " + stringified : stringified + " ago";
    },
  },
  components: { AlertBox, TaskDetails },
});
</script>
