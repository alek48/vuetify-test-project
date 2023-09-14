export default {
  namespaced: true,
  state: () => ({
    message: "Default toast",
    icon: "mdi-check",
    snackbarProps: {
      color: "success",
      value: false,
      timeout: -1,
      // ^ changeable in call, v constant styling
      rounded: "pill",
    },
    lastTimeout: "",
  }),
  mutations: {
    SET_TOAST(state: any, payload: any) {
      state.message = payload.message || "Toast text not set";
      state.snackbarProps.color = payload.color || "success";
      state.snackbarProps.icon = payload.icon || "mdi-check";
      state.snackbarProps.value = true;
      clearTimeout(state.timeout);
      state.lastTimeout = setTimeout(() => {
        state.snackbarProps.value = false;
      }, payload.timeout || 5000);
    },
  },
  actions: {
    showToast(state: any, payload: any) {
      state.commit("SET_TOAST", payload);
    },
  },
};
