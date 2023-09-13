<template>
  <v-container>
    <v-row>
      <v-col cols="auto" align-self="center">
        <v-card color="secondary">
          <v-card-title> This is our homepage </v-card-title>
          <v-card-text> About us, or dashboard? </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",
  mounted() {
    document.title = "Task Manager - Home";
  },
});
</script>
