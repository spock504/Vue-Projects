// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

fastclick.attach(document.body)//这样就能解决body下按钮点击300ms的延迟
// 懒加载
Vue.use(VueLazyLoad,{
  loading: '/static/images/Loading/loading-balls.svg'
})
// 下拉刷新
Vue.use(InfiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
