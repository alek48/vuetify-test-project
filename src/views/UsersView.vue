<template>
  <v-container>
    <v-row>
      <v-col>
        <UsersTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UsersTable from "../components/UsersTable.vue";

export default Vue.extend({
  components: { UsersTable },
  mounted() {
    document.title = "Task Manager - Users";
  },
});
</script>
