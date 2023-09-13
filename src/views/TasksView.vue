<template>
  <v-container>
    <v-row>
      <v-col>
        <TasksTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import TasksTable from "../components/TasksTable.vue";

export default Vue.extend({
  components: { TasksTable },
  mounted() {
    document.title = "Task Manager - Tasks";
  },
});
</script>
