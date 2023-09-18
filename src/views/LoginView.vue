<template>
  <v-container>
    <v-row>
      <v-col>
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { LoginForm },
  mounted() {
    document.title = "Login/Register";
  },
});
</script>
