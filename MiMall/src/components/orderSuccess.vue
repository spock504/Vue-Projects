<template>
  <div class="orderSuccess-page">
     <ul class="cart-status">
       <li class="cart-item active" v-for="item in cartStatus">
         <p class="cart-title">{{item}}</p>
         <div class="item-underline">
           <div class="item-line"></div>
           <div class="item-circle"></div>
         </div>
       </li>
     </ul>

    <div class="orderSuccess-msg">
      <p class="orderSuccessTitle">恭喜您！</p>
      <p class="orderSuccessTitle">您的订单已完成!</p>
      <div class="order-info">
        <p class="order-num">订单号:{{orderId}}</p>
        <p class="order-num">订单合计:￥{{OrderTotal}}</p>
      </div>
    </div>

    <div class="total-btn">
      <router-link tag="button"  class="btn cart-btn" to='/car'>购物车</router-link>
      <router-link tag="button" class="btn cartList-btn" to='/'>商品列表</router-link>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'

export default {
  data() {
    return {
      orderId: '',
      OrderTotal: '',
      cartStatus : [
        '确认地址',
        '查看订单',
        '支付',
        '订单确认'
      ],
    }
  },
  mounted() {
    this.getOrderTotal()
  },
  methods: {
  getOrderTotal() {
    this.orderId = this.$route.query.orderId
    axios.get('/users/getOrderTotal', {
      params: {orderId: this.orderId}
      }).then((res) => {
        if (res.data.status == '0') {
          this.OrderTotal = res.data.result.OrderTotal
        }
        console.log(res)
    })
  }
  }
}
</script>

<style type="text/css">
.orderSuccess-page {
  padding: 0 100px;
}
.cart-status {
  margin-top: 30px;
  width: 100%;
  font-size: 0;
}
.cart-status .cart-item {
  display: inline-block;
  width: 25%;
  text-align: center;
}
.cart-status .cart-item .cart-title {
  font-size: 18px;
}
.cart-status .item-underline {
  margin-top: 15px;
  position: relative;
  width: 100%;
}
.cart-status .item-underline .item-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 3px;
  background-color: #ccc;
}
.cart-status .item-underline .item-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px 0 0 -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
}
.cart-status .active .cart-title {
  color: #f11111;
}
.cart-status .active .item-line {
  background-color: #f11111;
}
.cart-status .active .item-circle {
  background-color: #f11111;
}
.orderSuccess-msg {
  margin-top: 80px;
  text-align: center;
}
.orderSuccess-msg .orderSuccessTitle {
  font-size: 30px;
  margin-top:20px;
  color: #f11111;
}
.orderSuccess-msg .order-info {
  margin-top: 40px;
}
.orderSuccess-msg .order-info .order-num {
  margin-right: 40px;
  display: inline-block;
  font-size: 20px;
  color: #ccc;
}
.total-btn {
  margin-top: 100px;
  text-align: center;
  font-size: 0;
}
.total-btn .btn {
  display: inline-block;
  width: 120px;
  height: 45px;
  line-height: 45px;
  border: none;
  background-color: #f11111;
  color: #fff;
  cursor:pointer;
}
.total-btn .cart-btn {
  margin-right: 20px;
}
</style>
