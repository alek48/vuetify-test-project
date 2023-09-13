<template>
  <v-data-table :loading="loading" :headers="headers" :items="tasks">
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../services/index";

export default Vue.extend({
  data: () => ({
    loading: true,
    headers: [
      { text: "Task", value: "task" },
      { text: "Created", value: "created_at" },
      { text: "Deadline", value: "dead_line" },
      { text: "Status", value: "status" },
    ],
    tasks: [],
  }),
  async created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks: async function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const vm = this;
      vm.loading = true;
      api.getTasks().then((response) => (this.tasks = response.data));
      vm.loading = false;
    },
  },
});
</script>
