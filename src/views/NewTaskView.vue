<template>
  <v-container>
    <v-row>
      <v-col> <TaskNewForm /> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import TaskNewForm from "@/components/TaskNewForm.vue";
import { defineComponent } from "vue";

export default defineComponent({ components: { TaskNewForm } });
</script>
