import { StorageArea } from '../config/types.json';

// eslint-disable-next-line no-undef
const Storage = EXTENSION.storage[StorageArea];

export default {
  _config: {
    name: 'storage',
  },
  getItem(key) {
    // eslint-disable-next-line no-undef
    if (IS_CHROME) {
      return new Promise((resolve) => Storage.get(key, resolve));
    }

    return Storage.get(key).then((save) => save[key]);
  },
  setItem(key, data) {
    const toSave = {
      [key]: JSON.parse(JSON.stringify(data)),
    };
    delete toSave[key].vuex;
    // eslint-disable-next-line no-undef
    if (IS_CHROME) {
      return new Promise((resolve) => Storage.set(toSave, resolve));
    }

    return Storage.set(toSave);
  },
  removeItem(key) {
    // eslint-disable-next-line no-undef
    if (IS_CHROME) {
      return new Promise((resolve) => Storage.remove(key, resolve));
    }

    return Storage.remove(key);
  },
  clear() {
    // eslint-disable-next-line no-undef
    if (IS_CHROME) {
      return new Promise((resolve) => Storage.clear(resolve));
    }

    return Storage.clear();
  },
  getAll() {
    // eslint-disable-next-line no-undef
    if (IS_CHROME) {
      return new Promise((resolve) => Storage.get(resolve));
    }

    return Storage.get();
  },
  length() {
    return this.getAll()
      .then((obj) => Object.keys(obj).length);
  },
  key(keyIndex) {
    return this.getAll()
      .then((obj) => obj[Object.keys(obj)[keyIndex]]);
  },
};
