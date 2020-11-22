import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import storage from './storage';
import state from "./state.json";
import mutations from "./mutations";

export const local = new VuexPersistence({
  storage
});

export default new Vuex.Store({
  state,
  mutations,
  plugins: [local.plugin]
});