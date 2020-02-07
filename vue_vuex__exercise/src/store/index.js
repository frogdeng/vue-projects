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
    cart: {
      carts: [],
    },
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
    getCart(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true)
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          // vm.cart = response.data.data;
          context.commit('CART', response.data.data)
        }
        context.commit('LOADING', false)
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(context,id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true)
      axios.delete(url).then((response) => {
        context.commit('LOADING', false)
        context.dispatch('getCart')
        console.log('刪除購物車項目', response);
      });
    },
    addtoCart(context, {id, qty}) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true)
      const item = {
        product_id: id,
        qty,
      };
      context.commit('LOADING', true)
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
        console.log('加入購物車:', response);
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
    CART(state, payload){
      state.cart = payload
    },
  },
  
  getters:{
    categories(state){
      return state.categories
    },
    products(state){
      return state.products;
    }
  }

});
