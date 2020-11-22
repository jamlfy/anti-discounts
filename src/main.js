import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.config.productionTip = false
Vue.use(Vuex);


const app = new Vue({
  render: h => h(App),
});








app.$on('message', (msg) => browser.tabs
	.query({ active: true, currentWindow: true })
  .then((tabs) => browser.runtime.sendMessage(tabs[0].id, { ...msg, ...tabs[0] })));

browser.runtime.onMessage.addListener(({ command, ...rest }) => app.$emit(command, rest));

app.$mount('#app');
