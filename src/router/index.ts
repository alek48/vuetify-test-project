import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
const HomeView = () => import("../views/HomeView.vue");
const UsersView = () => import("../views/UsersView.vue");
const TasksView = () => import("../views/TasksView.vue");
const NewUserView = () => import("../views/NewUserView.vue");
const NewTaskView = () => import("@/views/NewTaskView.vue");
const LoginView = () => import("@/views/LoginView.vue");

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
  {
    path: "/tasks/new",
    name: "new_task",
    component: NewTaskView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
