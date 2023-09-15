<template>
  <span>
    <AlertBox v-if="loading_fail" :alert_text="alert_text"></AlertBox>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="tasks"
      @click:row="showDetails"
    >
    </v-data-table>
    <v-dialog v-model="detailsVisible" max-width="60%">
      <TaskDetails :task="focused_task" />
    </v-dialog>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import api, { TaskData } from "../services/index";
import AlertBox from "./AlertBox.vue";
import TaskDetails from "./TaskDetails.vue";

export default defineComponent({
  data: () => ({
    loading: true,
    headers: [
      { text: "Task", value: "task" },
      { text: "Created", value: "created_at" },
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
          this.tasks = response.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading_fail = true;
          this.loading = false;
          this.alert_text = err.message + ": Couldn't load data";
          console.log(err.code);
        });
    },
    showDetails(_: unknown, item: { item: TaskData }) {
      this.detailsVisible = true;
      this.focused_task = item.item;
    },
  },
  components: { AlertBox, TaskDetails },
});
</script>
