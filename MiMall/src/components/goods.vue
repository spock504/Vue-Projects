<template>
<div class="goods-contain">
  <div class="goods-sort">
    <p>排序：</p>
    <p>默认</p>
    <p class="goods-price">价格<span class="icon-arrow">↑</span></p>
  </div>
  <div class="goods-items">
    <ul class="price-inter">
      <li class="price-name">价格：</li>
      <li class="price-item active">全部</li>
      <li class="price-item" v-for="(item, index) in price">{{item.startPrice}}-{{item.endPrice}}</li>
    </ul>
    <ul class="goods-info">
      <li class="goods-des" v-for="(item, index) in goods" :key="index">
        <div class="good-all">
          <div class="good-image">
            <img :src="'/static/images/' + item.productImg">
          </div>
          <p class="good-name">{{item.productName}}</p>
          <p class="good-price">￥{{item.productPrice}}</p>
          <div class="add-car">加入购物车</div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {getGoodsList} from 'api/goods'

export default {
  data() {
    return {
      goods : [],
      price:[
        {
          "startPrice":"0.00",
          "endPrice":"100.00"
        },
        {
          "startPrice":"100.00",
          "endPrice":"500.00"
        },
        {
          "startPrice":"500.00",
          "endPrice":"1000.00"
        },
        {
          "startPrice":"1000.00",
          "endPrice":"8000.00"
        },
      ],
    }
  },
  created() {
    this._getGoodsList()
  },
  methods: {
    _getGoodsList() {
      getGoodsList().then((res) => {
        this.goods = res.data
        console.log(this.goods)
      })
    }
  }
}

</script>
<style type="text/css">
.goods-contain {
  width: 100%;
  padding:20px 100px;
  box-sizing:border-box;
}
.goods-sort {
  display:flex;
  justify-content: flex-end;
  padding:20px 0;
}
.goods-sort p {
  margin-left:10px;
  cursor:pointer;
}
.goods-detail p{
  font-size:10px;
}
.goods-items {
  width: 100%;
  display:flex;
}
.goods-items .price-inter {
  flex-width:280px;
  width:280px;
}
.goods-items .price-inter .price-name {
  margin-bottom: 40px;
  font-weight:700;
}
.goods-items .price-inter li {
  margin-top:30px;
  font-size: 16px;
  cursor:pointer;
  transition: padding-left 0.3s ease-out;
}
.goods-items .price-inter .price-item:hover {
  padding-left: 15px;
  border-left: 3px solid #ee7a23;
  color: #ee7a23;
}
.goods-items .price-inter .active {
  padding-left: 15px;
  border-left: 3px solid #ee7a23;
  color: #ee7a23;
}
.goods-info {
  flex:1;
  font-size: 0;
  width:100%;
}
.goods-info li {
  width: 25%;
  display:inline-block;
  box-sizing:border-box;
  padding: 1% 2%;
}
.goods-info li .good-all {
  border: 1px solid #e9e9e9;
}
.goods-info li .good-all:hover {
  box-shadow:2px 2px 5px #ee7a23;
}
.goods-info li .good-image {
  width: 100%;
}
.goods-info li .good-image img {
  width: 100%;
  height: auto;
}
.goods-info li .good-name {
  margin: 10px 0 30px 10px;
  font-size: 16px;
  font-weight: 500;
  color: #735b5b;
}
.goods-info li .good-price {
  margin-left: 10px;
  font-size: 16px;
  color: #d1434a;
}
.goods-info li .add-car {
  width: 75%;
  margin: 20px auto;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  border:1px solid #d1434a;
  color: #d1434a;
}
.goods-info li .add-car:hover {
  background-color: #e09195;
}

</style>
