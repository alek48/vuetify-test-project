import { ActionContext } from "vuex";
import { State } from "..";

export default {
  namespaced: true,
  state: (): ToastState => ({
    message: "Default toast",
    icon: "mdi-check",
    snackbarProps: {
      color: "success",
      value: false,
      timeout: -1,
      // ^ changeable in call, v constant styling
      rounded: "pill",
    },
    lastTimeout: 0,
  }),
  mutations: {
    SET_TOAST(state: ToastState, payload: ToastProps) {
      state.message = payload.message || "Toast text not set";
      state.snackbarProps.color = payload.color || "success";
      state.icon = payload.icon || "mdi-check";
      state.snackbarProps.value = true;
      clearTimeout(state.lastTimeout);
      state.lastTimeout = setTimeout(() => {
        state.snackbarProps.value = false;
      }, payload.timeout || 5000);
    },
  },
  actions: {
    showToast(context: Context, payload: ToastProps) {
      context.commit("SET_TOAST", payload);
    },
  },
};

type Context = ActionContext<ToastState, State>;
export interface ToastState {
  message: string;
  icon: string;
  snackbarProps: {
    color: string;
    value: boolean;
    timeout: number;
    // ^ changeable in call, v constant styling
    rounded: string;
  };
  lastTimeout: number;
}

export interface ToastProps {
  message: string | null;
  color: string | null;
  icon: string | null;
  timeout: number | null;
}
