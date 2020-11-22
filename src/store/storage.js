import { StorageArea } from '../config/types.json';

export default {
  _config: {
    name: 'storage',
  },
  getItem(key) {
    /*eslint-disable */
    return browser.storage[StorageArea].get(key);
  },
  setItem(key, data) {
    /*eslint-disable */
    return browser.storage[StorageArea].get({
      [key]: data,
    });
  },
  removeItem(key) {
    /*eslint-disable */
    return browser.storage[StorageArea].remove(key);
  },
  clear() {
    /*eslint-disable */
    return browser.storage[StorageArea].clear();
  },
  length() {
    /*eslint-disable */
    return browser.storage[StorageArea].get()
      .then((obj) => Object.keys(obj).length);
  },
  key(keyIndex) {
    /*eslint-disable */
    return browser.storage[StorageArea].get()
      .then((obj) => obj[Object.keys(obj)[keyIndex]]);
  },
};
