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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/new",
    name: "new_user",
    component: NewUserView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TasksView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tasks/new",
    name: "new_task",
    component: NewTaskView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      onlyLoggedOut: true,
    },
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

router.beforeResolve((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.logged_in) {
      next({ name: "login", query: { redirect: to.name } });
      return;
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.onlyLoggedOut)) {
    if (store.state.logged_in) {
      if (to.query.redirect) {
        next(to.query.redirect as string);
      } else {
        next({ name: "home" });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
