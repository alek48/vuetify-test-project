<template>
  <v-container> Home </v-container>
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
