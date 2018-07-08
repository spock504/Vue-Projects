import Vue from 'vue'
import App from './App'
// import router from './router'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

// Vue.config.productionTip = false
const routes = [
        {
          path:'/',
          redirect:"goods"
        },
        {
          path:'/goods',
          component:goods
        },
        {
          path:'/ratings',
          component:ratings
        },{
          path:'/seller',
          component:seller
        }
]
const router = new VueRouter({
    mode:'history', //去掉难看的#
    'linkActiveClass': 'active', 
    routes
})
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')