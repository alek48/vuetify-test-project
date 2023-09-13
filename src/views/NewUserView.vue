<template>
  <v-container>
    <v-row>
      <v-col> <UserNewForm /> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import UserNewForm from "@/components/UserNewForm.vue";
import { defineComponent } from "vue";

export default defineComponent({ components: { UserNewForm } });
</script>
