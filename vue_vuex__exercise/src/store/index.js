/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    categories: [],
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status)
    },
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING', true)
      axios.get(url).then((response) => {
        // vm.products = response.data.products;
        // vm.getUnique();
        context.commit('PRODUCT', response.data.products)
        context.commit('CATEGORIES', response.data.products)

        console.log('取得產品列表:', response);
        context.commit('LOADING', false)
      });
    },
  },
  mutations: {
    LOADING(state, status){
      state.isLoading = status;
    },
    PRODUCT(state, payload){
      state.products = payload
    },
    CATEGORIES(state, payload){
        const categories = new Set();
        payload.forEach((item) => {
          categories.add(item.category);
        });
        state.categories = Array.from(categories);
    },
  }
});
