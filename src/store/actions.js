import {
  findByDomain, sort, filter, lastTime, finder, creatorError, creatorNotification, showNotification,
} from '../utils';
import { Mutation, Action, Proxies } from '../config/types.json';

const {
  i18n, notifications,
// eslint-disable-next-line no-undef
} = EXTENSION;

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
  [Action.UPDATE_ITEM]: async ({ commit, dispatch, state }, { prices = {}, id, ...item }) => {
    let remove = false;
    let newItem = {
      ...item,
      prices,
      id,
      error: false,
      load: true,
    };

    try {
      commit(Mutation.UPDATE_ITEM, newItem);
      const { now, price, ...data } = await dispatch(Action.GET_DATA, { url: atob(id) });
      const lastPrice = lastTime({ prices });
      const newPrice = parseInt(price, 10);

      newItem = {
        ...item,
        ...data,
        id,
        prices: {
          ...prices,
          [now]: newPrice,
        },
        load: false,
        error: false,
        isNew: false,
      };

      if (lastPrice && prices[lastPrice] && prices[lastPrice] === newPrice) {
        delete newItem.prices[lastPrice];
      } else if (showNotification[state.settings.notification](item, newPrice)) {
        notifications.create(newItem.id, creatorNotification(i18n.getMessage, newItem));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(Action.UPDATE_ITEM, e);
      newItem.load = false;
      newItem.error = true;
      remove = !!(remove && newItem.isNew);
    } finally {
      if (remove) {
        commit(Mutation.REMOVE_ITEM, newItem.id);
      } else {
        commit(Mutation.UPDATE_ITEM, newItem);
      }
    }

    return newItem.error;
  },
  [Action.UPDATE_BY_ID]: ({ dispatch, state: { items = [] } }, key) => {
    const item = items.find(finder(key));
    if (item) {
      return dispatch(Action.UPDATE_ITEM, item);
    }

    return Promise.resolve('No exist');
  },
  [Action.GET_DATA]: async ({ dispatch }, { url, index = Proxies.length - 1 }) => {
    const rules = findByDomain(url);
    if (!rules) {
      throw creatorError(true, 'No exist the rule');
    }

    try {
      const dom = document.createElement('html');
      dom.innerHTML = await fetch(Proxies[index] + url)
        .then((res) => res.text());

      if (!dom.innerHTML || index < 0) {
        throw creatorError(index <= 0, 'No run');
      }

      return Object.keys(rules)
        .reduce((obj, key) => ({
          ...obj,
          [key]: Object.keys(rules[key]).reduce((str, query) => {
            const nodeQuery = dom.querySelector(query);

            if (typeof nodeQuery !== 'string' && nodeQuery) {
              return rules[key][query]
                .reduce((node, replacer) => {
                  if (typeof node === 'string') {
                    if (Array.isArray(replacer)) {
                      return node.replace(new RegExp(...replacer[0]), replacer[1]);
                    }

                    return node;
                  }

                  if (Array.isArray(replacer)) {
                    return node[replacer[0]](replacer[1]) || '';
                  }

                  return node[replacer] || '';
                }, nodeQuery);
            }

            return str.trim();
          }, ''),
        }), {
          now: Date.now(),
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(Action.GET_DATA, e);
      if (index <= 0) {
        throw e;
      }

      return dispatch(Action.GET_DATA, {
        url,
        index: index - 1,
      });
    }
  },
  [Action.REMOVE_ITEM]: ({ commit }, key) => {
    commit(Mutation.REMOVE_ITEM, key);
  },
  [Action.ADD_ITEM]: ({ dispatch }, url) => {
    dispatch(Action.UPDATE_ITEM, {
      id: btoa(url),
      isNew: true,
    });
  },
};
