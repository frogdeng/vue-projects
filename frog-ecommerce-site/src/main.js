import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue'
import router from './router'

import './bus'
import currencyFilter from './filters/currency'


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)

axios.defaults.withCredentials = true;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


