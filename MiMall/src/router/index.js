import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods'
import Car from 'components/car'
import Address from 'components/address'
import OrderConfirm from 'components/orderConfirm'
import OrderSuccess from 'components/orderSuccess'

Vue.use(Router)

export default new Router ({
  routes: [
  {
    path: '/',
    component: Goods
  },
  {
    path: '/car',
    component: Car
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/orderConfirm',
    component: OrderConfirm
  },
  {
    path: '/orderSuccess',
    component: OrderSuccess
  }
  ]
})
