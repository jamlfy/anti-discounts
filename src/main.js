import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';

const {
  i18n,
// eslint-disable-next-line no-undef
} = EXTENSION;

Vue.component('FontIcon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.prototype.$translate = (...args) => i18n.getMessage(...args);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
