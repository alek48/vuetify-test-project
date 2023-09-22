import Vue from "vue";
import Vuex, { ActionContext } from "vuex";

import toast from "./modules/toast";
import cache from "./modules/cache";

import cookie from "@/services/cookies";

Vue.use(Vuex);

type Context = ActionContext<State, State>;

export default new Vuex.Store<State>({
  state: () => ({
    userToken: "",
    logged_in: false,
    username: "",
    userId: -1,
  }),
  getters: {},
  mutations: {
    async LOG_IN(state: State, payload: LoginPayload) {
      state.userToken = payload.token;
      state.username = payload.name;
      state.logged_in = true;
      state.userId = payload.id;
    },
    async LOG_OUT(state: State) {
      state.userToken = "";
      state.username = "";
      state.userId = -1;
      state.logged_in = false;
    },
  },
  actions: {
    async logIn(context: Context, payload: LoginPayload) {
      context.commit("LOG_IN", payload);
      cookie.set("name", payload.name);
      cookie.set("token", payload.token);
      cookie.set("id", payload.id.toString());
    },
    logOut(context: Context) {
      context.commit("LOG_OUT");
      cookie.set("name", "");
      cookie.set("token", "");
      cookie.set("id", "");
    },
  },
  modules: { toast, cache },
});

export interface State {
  userToken: string;
  logged_in: boolean;
  username: string;
  userId: number;
}

export interface LoginPayload {
  token: string;
  name: string;
  id: number;
}
