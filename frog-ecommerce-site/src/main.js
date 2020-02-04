import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';


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
Vue.component('Loading', Loading);



Vue.filter('currency', currencyFilter)

axios.defaults.withCredentials = true;


// VeeValidate
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('zh_TW', zh_TW);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


