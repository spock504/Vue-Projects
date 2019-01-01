import Vue from 'vue'
const state = {
    orderList : [],
    params: {}
}
const getters={
    //state无法直接通过state调用orderList的值，只能调用getOrderList的
    getOrderList:state =>state.orderList
}
// 异步, 解构赋值取值
const actions={
    fetchOrderList({commit,state}) {
        Vue.http.post('/api/getOrderList',state.params)
        .then((res)=>{
            commit('updateOrderList',res.data.list)
        },(err)=>{
            console.log(err)
        })
    }

}
// 同步的状态更改,复写orderList
const mutations= {
    updateOrderList(state,payload) {
        state.orderList = payload
    },
    //解构赋值
    updateParams (state,{key,val}) {
        state.params[key] = val
        console.log(state.params)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}