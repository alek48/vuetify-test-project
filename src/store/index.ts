import Vue from "vue";
import Vuex from "vuex";

import toast from "./modules/toast";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { toast },
});
