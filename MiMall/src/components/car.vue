<template>
  <div class="cart-page">
    <h2 class="cart-name">购物车</h2>
    <div class="cart-content">
      <ul class="cart-title">
        <li v-for="item in cartTitle" class="cart-des">{{item}}</li>
      </ul>
      <ul class="cart-list">
        <li v-for="(item, index) in cartList" class="cart-item">
          <ul class="item-content">
            <li class="item-info">
              <span class="item-icon" :class="{active: item.checked == '1'}" @click="select(item)"></span>
              <div class="item-images">
                <img v-lazy="'/static/images/'+item.productImage" class="item-img" />
              </div>
              <p class="item-name">{{item.productName}}</p>
            </li>
            <li class="item-onePrice">￥{{item.salePrice}}</li>
            <li class="item-counter">
              <div class="counter-component">
                <div class="counter-btn" @click="editNum('min',item)"> - </div>
                <div class="counter-show">{{item.productNum}}</div>
                <div class="counter-btn" @click="editNum('add', item)"> + </div>
            </div>
            </li>
            <li class="item-totalPrice">￥{{item.productNum*item.salePrice}}</li>
            <li class="item-del" @click="showConfirm(item.productId, item.productNum)">删除</li>
          </ul>
        </li>
      </ul>
      <my-dialog :is-show="showDelDialog" @on-close="closeDelDialog">
        <div class="del-content">
          <p>确认删除该商品吗</p>
          <div class="del-btn">
            <button type="button" class="btn-delete btn" @click="delItem">删除</button>
            <button type="button" class="btn-cancel btn" @click="closeDelDialog">取消</button>
          </div>
        </div>
      </my-dialog>
      <div class="result-total">
        <div class="result-select" @click="checkedAll">
          <span class="total-icon"  :class="{active: checkAll}" ></span>
          <p class="total-title">全选</p>
        </div>
        <div class="result-cal">
          <p class="cal-title">合计:</p>
          <p class="cal-totalNum">￥{{subPrice}}</p>
          <button class="cal-toPay" :class="{'cancel-pay': checkedCount == 0}" @click="checkOut">去结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {editCartNum, ERR_OK} from 'api/addCar'
import store from '../store/store'
import MyDialog from './base/dialog'



export default {
  data() {
    return {
      cartList: [],
      cartTitle: [
      '商品',
      '价格',
      '数量',
      '总价',
      '编辑',
      ],
      IndexItem: [],
      productId: '',
      productNum: 0,
      showDelDialog: false
    }
  },
  mounted() {
    this.getCarList()
  },
  computed: {
    checkAll() {
      return this.cartList.length == this.checkedCount
    },
    checkedCount() {
      var i = 0
      this.cartList.forEach((item) => {
        if (item.checked == '1') {
          i++
        }
      })
      return i
    },
    subPrice() {
      var price = 0
      this.cartList.forEach((item) => {
        if (item.checked == '1') {
          price += item.productNum * item.salePrice
        }
      })
      return price
    }
  },
  methods: {
    getCarList() {
      axios.get('users/carList').then((res) => {
        if (res.data.status == ERR_OK) {
        this.cartList = res.data.result
        console.log(res.data.result)
        }
      })
    },
    select(item) {
      item.checked = item.checked=='0'? '1': '0'
      this._editCartNum(item.Id, item.productNum, item.checked)
    },
    editNum(flag, item) {
      if (flag === 'min') {
        if (item.productNum === 1) {
          return
        }
        item.productNum--
        store.commit('updateCartCount', -1)
      } else {
        item.productNum++
        store.commit('updateCartCount', 1)
      }
      this._editCartNum(item.Id, item.productNum, item.checked)
    },
    _editCartNum(Id, productNum, checked) {
      editCartNum(Id, productNum, checked).then((res) => {
        if (res.data.status == ERR_OK) {
          this.getCarList()
        }
      })
    },
    showConfirm(Id,Num) {
      this.productId = Id
      this.productNum = Num
      this.showDelDialog = true
    },
    closeDelDialog() {
      this.showDelDialog = false
    },
    delItem() {
      axios.post('/users/carDel', {
        productId: this.productId
      }).then((res) => {
        if (res.status == '0') {
          this.showDelDialog = false
          this.getCarList()
          store.commit('updateCartCount', -this.productNum)
        }
      })
    },
    checkedAll() {
      var flag = !this.checkAll
      this.cartList.forEach((item) => {
        item.checked = flag ? '1' : '0'
      })
      axios.post('/users/carCheckAll',{
        checked: flag? '1' :'0'
      }).then((res) => {
        if(res.status == ERR_OK) {
          console.log('更新成功')
        }
      })
    },
    checkOut() {
      if (this.checkedCount > 0) {
        this.$router.push({
          path: '/address'
          })
      }
    }
  },
  components: {
    MyDialog
  }
}
</script>
<style type="text/css">
.cart-page {
  padding:0 100px;
  box-sizing: border-box;
  width: 100%;
}
.cart-page .cart-name {
  margin-top: 10px;
  font-size: 28px;
  color: #5c5757;
}
.cart-page .cart-content {
  margin-top: 20px;
  width:100%;
}
.cart-content .cart-title {
  height:60px;
  display: flex;
  background-color: #ccc;
}
.cart-content .cart-title .cart-des {
  height: 100%;
  line-height:60px;
  width: 260px;
  text-align: center;
  color:#281d1d;
}
.cart-content .cart-title li:first-child {
  width: 460px;
}
.item-content .item-icon {
  width:15px;
  height:15px;
  display:inline-block;
  border-radius: 50%;
  margin-left: 45px;
  border:1px solid #ccc;
  cursor:pointer;
}
.item-content .active {
  background-color: #f11111;
  border:1px solid #f11111;
}
.cart-content .item-images {
  width:60px;
  height:60px;
  margin-left: 60px;
}
.cart-content .item-images .item-img {
  width:100%;
  height:100%;
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
.cart-item .item-content li {
  width: 260px;
}
.cart-item .item-content .item-info {
  width: 460px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cart-item .item-content .item-info .item-name {
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.item-content .counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.item-content .counter-show {
  float: left;
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.item-content .counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.item-content .counter-btn:hover {
  border-color: #d1434a;
  background: #d1434a;
  color: #fff;
}
.item-content .item-totalPrice {
  color: #d1434a;
}
.item-content .item-del:hover {
  cursor: pointer;
  color: #d1434a;
}
.result-total {
  margin: 20px 0 40px 0;
  width: 100%;
  height:50px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  border: 1px solid #ccc;
}
.result-total .result-select {
  margin-left: 45px;
  display:flex;
}
.result-select .total-icon {
  width: 15px;
  height:15px;
  display:inline-block;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 20px;
  cursor:pointer;
}
.result-select .total-title {
  font-size: 20px;
  color: #d1434a;
  cursor: pointer;
}
.result-select .active {
  background-color: #f11111;
  border: 1px solid #f11111;
}
.result-total .result-cal {
  display: flex;
  height: 100%;
  line-height: 50px;
}
.result-cal .cal-title {
  font-size: 20px;
  margin-right:10px;
}
.result-cal .cal-totalNum {
  font-size: 20px;
  margin-right: 20px;
  font-weight: 600;
  color: #d1434a;
}
.result-cal .cal-toPay {
  height: 100%;
  width: 100px;
  color: #fff;
  background-color: #d1434a;
  border:none;
  cursor: pointer;
}
.result-cal .cancel-pay {
  background-color: #ccc;
  cursor: default ;
}
.del-content p {
  font-size: 18px;
  color: #d94848;
}
.del-content .del-btn {
  text-align: center;
  margin-top:30px;
  width: 100%;
}
.del-content .del-btn .btn {
  text-align: center;
  padding: 10px 0 10px 0;
  width: 30%;
  background-color: #4da5fa;
  color: #fff;
  border: none;
  cursor: pointer;
}
.del-content .del-btn .btn-delete {
  margin-right: 40px;
}

</style>
