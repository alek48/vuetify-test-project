import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import TasksView from "../views/TasksView.vue";
import NewUserView from "../views/NewUserView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/users/new",
    name: "new_user",
    component: NewUserView,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
