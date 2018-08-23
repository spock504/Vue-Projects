<template>
  <div class="orderConfirm-page">
     <ul class="cart-status">
       <li class="cart-item" v-for="(item, index) in cartStatus"  :class="{'active': index === itemIndex}">
         <p class="cart-title">{{item}}</p>
         <div class="item-underline">
           <div class="item-line"></div>
           <div class="item-circle"></div>
         </div>
       </li>
     </ul>
    <h2 class="confirm-name">订单详情</h2>
    <div class="cart-content">
      <ul class="cart-title">
        <li v-for="item in cartTitle" class="cart-des">{{item}}</li>
      </ul>
    </div>
      <ul class="cart-list">
        <li v-for="(item, index) in productList" class="cart-item" v-if="item.checked == 1">
          <ul class="item-content">
            <li class="item-info">
              <div class="item-images">
                <img v-lazy="'/static/images/'+item.productImage" class="item-img" />
              </div>
              <p class="item-name">{{item.productName}}</p>
            </li>
            <li class="item-onePrice">￥{{item.salePrice}}</li>
            <li class="counter-show">X {{item.productNum}}</li>
            <li class="item-totalPrice">￥{{item.productNum*item.salePrice}}</li>
          </ul>
        </li>
      </ul>
      <div class="total-info clearfix">
        <ul class="total-content">
          <li>
            <span class="total-name">商品总价:</span>
            <span class="total-price">$ {{totalPrice}}</span>
          </li>
          <li>
            <span class="total-name">快递费:</span>
            <span class="total-deliver">$ {{shipping}}</span>
          </li>
          <li>
            <span class="total-name">折扣:</span>
            <span class="total-discount">$ {{discount}}</span>
          </li>
          <li>
            <span class="total-name">合计: </span>
            <span class="total-AllPrice">$ {{orderTotal}}</span>
          </li>
        </ul>
      </div>
      <div class="total-btn">
        <button class="btn-back btn" @click="backPage">上一步</button>
        <button class="btn-confirmPay btn" @click="_payMent">确认支付</button>
      </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
import {payMent, ERR_OK} from 'api/users'

export default {
  data() {
    return {
      productList: [],
      cartStatus : [
        '确认地址',
        '查看订单',
        '支付',
        '订单确认'
      ],
      cartTitle: [
        '商品',
        '价格',
        '数量',
        '总价',
      ],
      itemIndex: 1 ,
      shipping: 10,
      discount: 50,
    }
  },
  mounted() {
    this.getCarList()
  },
  computed: {
    totalPrice() {
      var sub = 0
      this.productList.forEach((item) => {
        if (item.checked == '1') {
          sub += item.productNum * item.salePrice
        }
      }
    )
    return sub
    },
    orderTotal() {
      let cost = this.totalPrice + this.shipping - this.discount
      return cost
    }
  },
  methods: {
    getCarList() {
      axios.get('https://cors-anywhere.herokuapp.com/http://linyijiu.cn:3000/users/carList').then((res) => {
        if (res.data.status == ERR_OK) {
        this.productList = res.data.result
        }
      })
    },
    backPage() {
      this.$router.back()
    },
    _payMent() {
      const addressId = this.$route.query.addressId
      payMent(this.productList, addressId, this.orderTotal, this.shipping, this.discount).then((res) => {
        if (res.data.status == ERR_OK) {
          this.$router.push({
            path: '/orderSuccess?orderId='+ res.data.result
          })
        }
      })
    }
  }
}
</script>

<style type="text/css">
.orderConfirm-page {
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
.orderConfirm-page .confirm-name {
  margin: 30px 0;
  font-size: 20px;
  font-weight: 600;
}
.cart-list {
  border: 1px solid #ccc;
}
.cart-content .cart-title {
  height:60px;
  display: flex;
  background-color: #ccc;
}
.cart-content .cart-title .cart-des {
  height: 100%;
  line-height:60px;
  width: 300px;
  text-align: center;
  color:#281d1d;
}
.cart-content .cart-title li:first-child {
  width: 720px;
}

.cart-content .cart-list {
  width: 100%;
  box-sizing:border-box;
  border:1px solid #ccc;
}
.cart-content .cart-list .cart-item {
  width: 100%;
}
.cart-item .item-content {
  display:flex;
  text-align:center;
  height:80px;
  line-height: 80px;
}
.item-content .item-images {
  width:60px;
  height:60px;
  margin-left: 90px;
}
.item-content .item-images .item-img {
  width:100%;
  height:100%;
}
.cart-item .item-content li {
  width: 300px;
}
.cart-item .item-content .item-info {
  width: 720px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cart-item .item-content .item-info .item-name {
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.item-content .item-totalPrice {
  color: #d1434a;
}
.total-info {
  margin-top: 20px;
}
.total-info .total-content {
  float: right;
}
.total-info .total-content li {
  width: 180px;
  font-size: 18px;
  height: 25px;
  line-height: 25px;
}
.total-info .total-content li .total-name {
  width: 80px;
  margin-right: 15px;
  display: inline-block;
  color: #ccc;
}
.total-info .total-content li .total-AllPrice {
  color: #f11111;
}
.total-btn {
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
}
.total-btn .btn {
  width: 120px;
  height: 45px;
  line-height: 45px;
  display: inline-block;
  background-color: #f11111;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
