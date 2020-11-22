import {
  listDomains, sort, filter, lastTime, finder, load,
} from '../utils';
import { Mutation, Action } from '../config/types.json';
import RULES from '../config/rules.json';

export default {
  [Action.RUNNER]: ({ dispatch, commit, state }) => {
    setTimeout(async () => {
      const [data] = state.items
        .filter(filter(state))
        .sort(sort);

      if (data) {
        await dispatch(Action.UPDATE_ITEM, data);
      }

      commit(Mutation.NEXT_RUN);
      dispatch(Action.RUNNER);
    }, state.settings.nextDate);
  },
  [Action.UPDATE_ITEM]: async ({ commit, dispatch }, { prices = {}, url, ...item }) => {
    let newItem = {
      ...item,
      prices,
      url,
      error: false,
      load: true,
    };

    try {
      commit(Mutation.UPDATE_ITEM, newItem);

      const { now, price, ...data } = await dispatch(Action.GET_DATA, url);
      const lastThatTime = lastTime({ prices });

      newItem.prices[now] = price;

      if (lastThatTime && newItem.prices[lastThatTime] && newItem.prices[lastThatTime] === price) {
        delete newItem.prices[lastThatTime];
      }

      newItem = {
        ...newItem,
        ...data,
        load: false,
        error: false,
      };
    } catch (e) {
      newItem.load = false;
      newItem.error = true;
    } finally {
      commit(Mutation.NEXT_RUN, newItem);
    }

    return newItem.error;
  },
  [Action.UPDATE_BY_ID]: ({ dispatch, store }, key) => {
    const item = store.items.find(finder(key));
    if (item) {
      return dispatch(Action.UPDATE_BY_ID, item);
    }

    return Promise.resolve('No exist');
  },
  [Action.GET_DATA]: async (context, url) => {
    const pathRule = listDomains.find((rule) => rule.exec(url));

    if (!pathRule) {
      throw new Error('No exist the rule');
    }

    const rules = RULES[pathRule];
    const element = await load(url, btoa(url));

    return Object.keys(rules)
      .reduce((obj, key) => ({
        ...obj,
        [key]: Object.keys(rules[key]).reduce((str, query) => {
          const node = element.querySelector(query);
          if (!str && node) {
            return rules[key][query]
              .reduce((strx, replacer) => strx.replace(...replacer), node.innerText);
          }

          return str;
        }, ''),
      }), {});
  },
  [Action.REMOVE_ITEM]: ({ commit }, key) => {
    commit(Mutation.REMOVE_ITEM, key);
  },
  [Action.ADD_ITEM]: ({ dispatch }, url) => {
    const urlObj = new URL(url);
    urlObj.search = '';
    dispatch('updateItem', {
      url: urlObj.toString(),
      id: btoa(urlObj.toString()),
    });
  },
  [Action.OPEN_TAB]: (context, url) => {
    console.log('context', context, url);
  },
};
