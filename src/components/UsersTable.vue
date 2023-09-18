<template>
  <span>
    <AlertBox v-if="loading_fail" :alert_text="alert_text"> </AlertBox>
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
      <UserDetails :user_id="focused_user" />
    </v-dialog>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { UserData } from "@/services";

import api from "../services";
import AlertBox from "./AlertBox.vue";
import UserDetails from "./UserDetails.vue";
import { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
  data: () => ({
    users: [] as UserData[],
    pages: 0,
    current_page: 1,
    focused_user: -1,
    loading: true,
    headers: [
      { text: "id", value: "id" },
      { text: "name", value: "name" },
      { text: "email", value: "email" },
      { text: "phone", value: "phone" },
      { text: "status", value: "status" },
    ],
    detailsVisible: false,
    loading_fail: false,
    alert_text: "",
  }),
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      api
        .getUsersPage(this.current_page)
        .then((response: AxiosResponse) => {
          this.users = response.data.data;
          this.loading = false;
          this.pages = response.data.last_page;
        })
        .catch((err: AxiosError) => {
          this.loading_fail = true;
          this.loading = false;
          this.alert_text = err.message + ": Couldn't load data";
        });
    },
    showDetails(_: unknown, item: { item: UserData }) {
      this.detailsVisible = true;
      this.focused_user = Number(item.item.id);
    },
  },
  watch: {
    current_page: function () {
      this.fetchUsers();
    },
  },
  components: { UserDetails, AlertBox },
});
</script>
