import { ActionContext } from "vuex";
import { State } from "..";

export default {
  namespaced: true,
  state: (): CacheState => ({
    users: [],
    specializations: [],
  }),
  mutations: {
    SET_USERS_CACHE(state: CacheState, payload: Array<UserCachedData>) {
      state.users = payload;
    },
    SET_SPECIALIZATIONS_CACHE(
      state: CacheState,
      payload: Array<SpecCachedData>
    ) {
      state.specializations = payload;
    },
  },
  actions: {
    setUsers(context: Context, payload: Array<UserCachedData>) {
      context.commit("SET_USERS_CACHE", payload);
    },
    setSpecs(context: Context, payload: Array<SpecCachedData>) {
      context.commit("SET_SPECIALIZATIONS_CACHE", payload);
    },
  },
};

type Context = ActionContext<CacheState, State>;

export type UserCachedData = { id: number; name: string };
export type SpecCachedData = UserCachedData;

export interface CacheState {
  users: Array<UserCachedData>;
  specializations: Array<UserCachedData>;
}
