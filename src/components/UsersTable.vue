<template>
  <span>
    <v-data-table
      disable-pagination
      disable-filtering
      disable-sort
      hide-default-footer
      :headers="headers"
      :items="users"
      :loading="loading"
      @click:row="showDetails"
    >
    </v-data-table>
    <v-pagination :length="pages" v-model="current_page"> </v-pagination>
    <v-dialog v-model="detailsVisible" max-width="60%">
      <UserDetails :user="focused_user" />
    </v-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import UserDetails from "./UserDetails.vue";
import api from "../services";

export default Vue.extend({
  data: () => ({
    users: [],
    pages: 0,
    current_page: 1,
    focused_user: undefined,
    loading: true,
    headers: [
      { text: "id", value: "id" },
      { text: "name", value: "name" },
      { text: "email", value: "email" },
      { text: "phone", value: "phone" },
      { text: "status", value: "status" },
    ],
    detailsVisible: false,
  }),
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const vm = this;
      vm.loading = true;
      api
        .getUsersPage(vm.current_page)
        .then((response) => {
          vm.users = response.data.data;
          vm.loading = false;
          vm.pages = response.data.last_page;
        })
        .catch((err) => console.log(err));
    },
    showDetails(_: any, item: any) {
      console.log(item.item.id);
      console.log(typeof item);
      this.detailsVisible = true;
      this.focused_user = item.item;
    },
  },
  watch: {
    current_page: function () {
      this.fetchUsers();
    },
  },
  components: { UserDetails },
});
</script>
