export default {
  removeItem (state, key) {
    const index = state.items.findIndex(item => key === item.key);
    if(index >= 0 ) {
      state.items.splice(index, 1);
    }
  },
  updateItem (state, item = {}) {
    const index = state.items.findIndex(({ key }) => key === item.key);
    if(index >= 0 ) {
      state.items.splice(index, 1, item);
    } else {
      state.items.unshift(item);
    }
  },
  nextRun(state){
    state.lastRun = new Date();
  },
  updateSettings(state, settings= {}){
    state.settings = {
      ...state.settings,
      ...settings
    };
  }
};