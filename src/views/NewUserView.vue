<template>
  <v-container>
    <v-row>
      <v-col> <UserNewDialog /> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import UserNewDialog from "@/components/UserNewDialog.vue";
import { defineComponent } from "vue";

export default defineComponent({ components: { UserNewDialog } });
</script>
