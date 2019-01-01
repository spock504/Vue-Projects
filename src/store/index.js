import Vuex from 'vuex'
import Vue from 'vue'
import orderList from './modules/orderList'

Vue.use(Vuex)
// 实例化输出Vuex的数据仓库 store
export default new Vuex.Store({
    modules:{
        orderList
    }
})
