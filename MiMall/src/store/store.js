import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartCount:0
  },
  mutations: {
    setCartCount(state,cartCount){
      state.cartCount = cartCount;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    }
  }
});
export default store
