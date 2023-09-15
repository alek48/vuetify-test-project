<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="nav_drawer = !nav_drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Task Tools</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="$store.state.logged_in">
        Welcome, {{ $store.state.username }}
      </span>
      <v-btn v-if="$store.state.logged_in" @click="logOut" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else :to="{ name: 'login' }" icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn :to="{ name: 'home' }" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="nav_drawer" temporary>
      <v-list nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Navigation </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Users</v-subheader>
        <v-list-item link exact :to="{ name: 'users' }">
          <v-list-item-icon>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>List of users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link exact :to="{ name: 'new_user' }">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add user</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>Tasks</v-subheader>
        <v-list-item link exact :to="{ name: 'tasks' }">
          <v-list-item-icon>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>List of tasks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link exact :to="{ name: 'new_task' }">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
      <v-snackbar v-bind="$store.state.toast.snackbarProps">
        <v-icon>{{ $store.state.toast.icon }}</v-icon>
        {{ $store.state.toast.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Store } from "vuex";

export default Vue.extend({
  name: "App",

  data: () => ({
    nav_drawer: false,
  }),
  methods: {
    logOut() {
      this.$store.dispatch("logOut", {});
      this.$store.dispatch("toast/showToast", {
        message: "Succesfully logged out",
        icon: "mdi-logout",
        color: "info",
      });
      if (this.$route.name !== "home") {
        this.$router.push({ name: "home" });
      }
    },
  },
});
</script>

<style scoped>
.v-btn--active::before {
  opacity: 0;
}
</style>
