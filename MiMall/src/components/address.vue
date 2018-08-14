<template>
  <div class="address-page">
     <ul class="cart-status">
       <li class="cart-item" v-for="(item, index) in cartStatus"  :class="{'active': index === itemIndex}">
         <p class="cart-title">{{item}}</p>
         <div class="item-underline">
           <div class="item-line"></div>
           <div class="item-circle"></div>
         </div>
       </li>
     </ul>
     <div class="address-content">
       <h2 class="address-title">收货地址</h2>
       <ul class="addr-content">
        <li class="addr-item" v-show="showAddress">
          <p class="addr-name">name: spock</p>
          <p class="addr-address">address: 廣東省廣州市番禺区</p>
          <p class="addr-tel">tel: 1111</p>
          <div class="addr-del" @click="delAddr">X</div>
        </li>
        <li class="addr-item" v-for="(item, index) in addressList" v-show="showAddress" @click="selecteId = item.Id">
          <p class="addr-name">name:{{item.Name}}</p>
          <p class="addr-address">address:{{item.Address}}</p>
          <p class="addr-tel">tel:{{item.Tel}}</p>
          <div class="addr-del" @click="delAddr">X</div>
        </li>
        <li class="addr-item addr-push">
          <div class="push-icon">+</div>
          <p class="push-title">添加新地址</p>
        </li>
       </ul>
     </div>
     <div class="nextStep">
       <router-link tag="button" class="next-btn" :to = "{path: 'orderConfirm', query: {addressId: selecteId}}">下一步</router-link>
     </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cartStatus : [
        '确认地址',
        '查看订单',
        '支付',
        '订单确认'
      ],
      itemIndex: 0,
      addressList: [],
      showAddress: true,
      selecteId: '0'
    }
  },
  mounted() {
    this.getAddressList()
  },
  methods: {
    getAddressList() {
      axios.get('/users/addressList').then((res) => {
        this.addressList = res.data.result
        console.log(res.data)
      })
    },
    delAddr() {
      this.showAddress = false
    }
  }
}
</script>
<style type="text/css">
.address-page {
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
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

.address-content {
  font-size: 0;
}
.address-content .addr-item {
  display: inline-block;
  margin: 40px 0 0 20px;
  padding-left: 10px;
  width: 300px;
  height: 200px;
  border: 2px solid #ccc;
  overflow: hidden;
  position: relative;
}
.address-content .addr-item:hover {
  border: 2px solid #f11111;
}
.address-content .address-title {
  margin-top: 40px;
  font-size: 20px;
  font-weight: 600;
}
.address-content .addr-content p {
  margin-top: 25px;
  font-size: 18px;
  font-weight: 600;
  height: 20px;
  line-height: 20px;
}
.address-content .addr-content .addr-del {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 10px;
}
.address-content .addr-content .addr-del:hover {
  cursor: pointer;
  color: #f11111;
}
.address-content .addr-content .addr-address {
  word-wrap: break-word;
  height: 40px;
}
.address-content .addr-content .push-icon {
  font-size: 60px;
  margin-top: 20px;
}
.address-content .addr-content .addr-push {
  text-align:center;
}
.nextStep {
  text-align: right;
  margin:50px;
}
.nextStep .next-btn {
  width: 120px;
  height: 45px;
  background-color: #f11111;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
