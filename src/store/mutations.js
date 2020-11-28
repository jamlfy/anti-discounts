import { finder } from '../utils';
import { Mutation, MIL_SEG } from '../config/types.json';

export default {
  [Mutation.REMOVE_ITEM]: (state, id) => {
    const index = state.items.findIndex(finder(id));
    if (index >= 0) {
      state.items.splice(index, 1);
    }
  },
  [Mutation.UPDATE_ITEM]: (state, item = {}) => {
    const index = state.items.findIndex(finder(item.id));
    if (index >= 0) {
      state.items.splice(index, 1, item);
    } else {
      state.items.unshift(item);
    }
  },
  [Mutation.NEXT_RUN]: (state) => {
    // eslint-disable-next-line no-param-reassign
    state = {
      ...state,
      // eslint-disable-next-line no-unused-vars
      lastRun: Date.now() - (state.settings.nextDate * MIL_SEG),
    };
  },
  [Mutation.UPDATE_SETTING]: (state, settings = {}) => {
    // eslint-disable-next-line no-param-reassign
    state = {
      ...state,
      settings: {
        ...state.settings,
        ...settings,
      },
    };
  },
};
