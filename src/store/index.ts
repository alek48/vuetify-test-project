import Vue from "vue";
import Vuex from "vuex";

import toast from "./modules/toast";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    userToken: "",
    logged_in: false,
    username: "",
  }),
  getters: {},
  mutations: {
    LOG_IN(state: any, payload: any) {
      state.userToken = payload.token;
      state.username = payload.name;
      state.logged_in = true;
    },
    LOG_OUT(state: any, payload: any) {
      state.userToken = "";
      state.username = "";
      state.logged_in = false;
    },
  },
  actions: {
    logIn(state: any, payload: any) {
      state.commit("LOG_IN", payload);
    },
    logOut(state: any, payload: any) {
      state.commit("LOG_OUT", payload);
    },
  },
  modules: { toast },
});
