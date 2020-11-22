export const StorageArea = "sync";

export default {
  _config: {
    name: "storage"
  },
  getItem(key){
    return browser.storage[StorageArea].get(key);
  },
  setItem(key, data){
    return browser.storage[StorageArea].get({
      [key]: data
    });
  },
  removeItem(key){
    return browser.storage[StorageArea].remove(key);
  },
  clear(){
    return browser.storage[StorageArea].clear();
  },
  length(){
    return browser.storage[StorageArea].get()
      .then(obj => Object.keys(obj).length);
  },
  key(keyIndex) {
    return browser.storage[StorageArea].get()
      .then(obj => obj[Object.keys(obj)[keyIndex]]);
  }
};