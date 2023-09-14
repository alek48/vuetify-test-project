<template>
  <v-container>
    <v-row>
      <v-col> <UserNewForm /> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import UserNewForm from "@/components/UserNewForm.vue";

export default defineComponent({ components: { UserNewForm } });
</script>
