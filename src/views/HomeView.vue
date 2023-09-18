<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-card color="secondary">
          <v-card-title> This is our homepage </v-card-title>
          <v-card-text> About us, or dashboard? </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="$store.state.logged_in">
        <v-card cols="auto">
          <v-card-title> Your Tasks </v-card-title>
          <v-card-text>
            <TasksTable :filter="$store.state.userId" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script lang="ts">
import TasksTable from "@/components/TasksTable.vue";
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",
  mounted() {
    document.title = "Dashboard";
  },
  components: { TasksTable },
});
</script>
