export default {
  removeItem({ commit }, key){
    commit("removeItem", key);
  },
  addItem({ dispatch }, url){
    dispatch('updateItem', {
      key: convert(url),
      url,
    });
  },
  updateToRequest ({ dispatch, store, commit }){
    const itemToUpdate = store.state.items
      .filter(({ prices = {} }) => {
        const times = Object.keys(prices);
        return !store.state.lastRun || !times.length || store.state.lastRun > times[ times.length - 1 ];
      })
      .map(data => dispatch('updateItem', data));

    return Promise
      .all(itemToUpdate)
      .then(() => commit("nextRun"));
  },
  updateById({ dispatch, store }, id){
    let item = store.items.find(({ key }) => id === key);
    if(item){
      return dispatch("updateItem", item);
    }

    return Promise.resolve("No exist");
  },
  async updateItem({ commit, dispatch }, { prices={}, url, ...item }){
    let newItem = {
      ...item,
      prices,
      url,
      error : false,
      load : true,
    };
    
    try {
      commit("updateItem", newItem);

      const { now, price, ...data } = await dispatch('getData', url);
      const times = Object.keys(prices);
      const lastPrice = prices[ times[ times.length -1 ] ];

      if ( lastPrice !== price ){
        newItem.prices[now] = price;
      }

      newItem = { 
        ...newItem, 
        ...data,
        load: false,
        error: false,
      };

    } catch(e){
      newItem.load = false;
      newItem.error = true;
    } finally {
      commit("updateItem", newItem);
    }

    return newItem.error;
  },
  getData(context, url){

  },
  openTab(context, url){
    
  }
};