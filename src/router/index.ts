import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store/index";
const HomeView = () => import("../views/HomeView.vue");
const UsersView = () => import("../views/UsersView.vue");
const TasksView = () => import("../views/TasksView.vue");
const NewUserView = () => import("../views/NewUserView.vue");
const NewTaskView = () => import("@/views/NewTaskView.vue");
const LoginView = () => import("@/views/LoginView.vue");
const ProfileView = () => import("@/views/ProfileView.vue");

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
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.logged_in) {
      next({ name: "login" });
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
