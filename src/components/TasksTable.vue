<template>
  <span>
    <AlertBox :v_if="loading_fail" :alert_text="alert_text"></AlertBox>
    <v-data-table :loading="loading" :headers="headers" :items="tasks">
    </v-data-table>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import api from "../services/index";
import AlertBox from "./AlertBox.vue";

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
  },
  components: { AlertBox },
});
</script>
