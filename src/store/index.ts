import Vue from "vue";
import Vuex, { ActionContext } from "vuex";

import toast from "./modules/toast";

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
    LOG_IN(state: State, payload: LoginPayload) {
      state.userToken = payload.token;
      state.username = payload.name;
      state.logged_in = true;
      state.userId = payload.id;
    },
    LOG_OUT(state: State) {
      state.userToken = "";
      state.username = "";
      state.userId = -1;
      state.logged_in = false;
    },
  },
  actions: {
    logIn(context: Context, payload: LoginPayload) {
      console.log(payload.token);
      context.commit("LOG_IN", payload);
    },
    logOut(context: Context) {
      context.commit("LOG_OUT");
    },
  },
  modules: { toast },
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
