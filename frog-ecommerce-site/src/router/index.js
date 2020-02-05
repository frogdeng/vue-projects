import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/pages/Login.vue'
import Products from '@/components/pages/Products.vue'
import Dashboard from '@/components/Dashboard.vue'
import CustomerOrder from '@/components/pages/CustomerOrders.vue'
import CustomerCheckout from '@/components/pages/CustomerCheckout.vue'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)



const routes = [
  {
    path: '*',
    redirect:'login'
  },
  // {
  //   path: '/',
  //   name: 'helloworld',
  //   component: HelloWorld,
  //   meta: { requiresAuth: true }
  // },

  {
    path: '/login',
    name: 'Login',
    component: Login,
   
  },
  {
    path: '/admin',
    name: 'admin',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
     },
    ],
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'customer_order',
        name: 'CustomerOrder',
        component: CustomerOrder,
     },
     {
      path: 'customer_checkout/:orderId',
      name: 'CustomerCheckout',
      component: CustomerCheckout,
    },
    ],
  },

  // {
  //   path: '/products',
  //   name: 'Products',
  //   component: Products,
  //   meta: { requiresAuth: true }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log('to=',to, 'from=',from, 'next=', next)
//   if(to.meta.requiresAuth){
//     const api = 'https://vue-course-api.hexschool.io/api/user/check';
//       axios.post(api).then((response) => {
//         console.log(response.data)
//         if(response.data.success){
//           next()
//         }else{
//           next({
//             path:'/login'
//           })
//         }
//       })
//   }else{
//     next()
//   }
//  });




router.beforeEach((to, from, next) => {
  console.log('to=',to, 'from=',from, 'next=', next)
  if(to.meta.requiresAuth){
    const api = 'https://vue-course-api.hexschool.io/api/user/check';
    axios.post(api).then((response) => {
      if(response.data.success){
        next();
      }else{
        next({
          path: '/login'
        })
      }
    })
  }else{
    next();
  }
})


export default router

