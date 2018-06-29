// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import IndexPage from './pages/index'
import Detail from './pages/detail'
import DetailAnalysis from './pages/detail/analysis'
import DetailCount from './pages/detail/count'
import DetailForecast from './pages/detail/forecast'
import DetailPublish from './pages/detail/publish'
import OrderListPage from './pages/orderList'


Vue.use(VueRouter); //路由管理
Vue.use(VueResource);   //模拟后台数据处理

let router = new VueRouter({
  // 这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
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
          redirect:'/detail/count',   //不希望用户访问detail页面，所以重定向到该页面上
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
  router,           //路由要在实例中注册
  components: { Layout },
  template: '<Layout/>'
})
