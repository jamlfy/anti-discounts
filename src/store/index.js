import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import state from '../config/state.json';
import storage from './storage';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export const local = new VuexPersistence({
  storage,
  asyncStorage: true,
});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [local.plugin],
});
