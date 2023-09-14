<template>
  <v-container>
    <v-row>
      <v-col> <TaskNewForm /> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TaskNewForm from "@/components/TaskNewForm.vue";

export default defineComponent({ components: { TaskNewForm } });
</script>
