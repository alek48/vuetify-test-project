<template>
  <v-alert type="error">{{ alert_text }}</v-alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { alert_text: { type: String, required: true } },
  data: () => ({
    name: "test",
  }),
});
</script>
