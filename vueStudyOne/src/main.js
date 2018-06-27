// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout.vue'
import VueRouter from 'vue-router'
import IndexPage from './pages/index'
import VueResource from 'vue-resource'
import Detail from './pages/detail'

import DetailAnalysis from './pages/detail/analysis'
import DetailCount from './pages/detail/count'
import DetailForecast from './pages/detail/forecast'
import DetailPublish from './pages/detail/publish'
import OrderListPage from './pages/orderList'


Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            component: IndexPage
        },
        {
            path: '/orderlist',
            component: OrderListPage
        },
        {
          path:'/detail',
          component:Detail,
          redirect:'/detail/count',
          children:[
          {
            path: 'analysis',
            component: DetailAnalysis
          },
          {
            path: 'count',
            component: DetailCount
          },
          {
            path: 'forecast',
            component: DetailForecast
          },
          {
            path: 'publish',
            component: DetailPublish
          }
          ]
        }
    ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
