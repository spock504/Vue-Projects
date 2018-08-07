<template>
<div class="goods-contain">
  <div class="goods-sort">
    <p>排序：</p>
    <p>默认</p>
    <p class="goods-price" @click="sortBy()">价格<span class="icon-arrow" :class="{arrow_turn:!orderFlag}">↑</span></p>
  </div>
  <div class="goods-items">
    <ul class="price-inter">
      <li class="price-name">价格：</li>
      <li class="price-item" :class="{active: priceLevel === 'all'}" @click="selectInter('all')">全部</li>
      <li class="price-item" :class="{active: priceLevel === index}" v-for="(item, index) in price" @click="selectInter(index)">{{item.startPrice}}-{{item.endPrice}}</li>
    </ul>
    <ul class="goods-info">
      <li class="goods-des" v-for="(item, index) in goods" :key="index">
        <div class="good-all">
          <div class="good-image">
            <img v-lazy="'/static/images/' + item.productImg">
          </div>
          <p class="good-name">{{item.productName}}</p>
          <p class="good-price">￥{{item.productPrice}}</p>
          <div class="add-car">加入购物车</div>
        </div>
      </li>
    </ul>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
    <!-- 加载更多 -->
    </div>
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
      page: 0,
      pageSize: 8,
      orderFlag: true,
      priceLevel: 'all',
      busy: true,
    }
  },
  created() {
    this._getGoodsList(false)
  },
  methods: {
    _getGoodsList(flag) {
      getGoodsList(this.page, this.pageSize, this.orderFlag, this.priceLevel).then((res) => {
        if (flag) {
          //多次加载数据，则需要把数据相加
          this.goods = this.goods.concat(res.data)
          if (res.data.length === 0) {
            //没有数据可加载就关闭无限滚动
            this.busy = true
          } else {
            //否则仍可以触发无限滚动
            this.busy = false
          }
        } else {
          //第一次加载数据并且允许滚动
          this.goods = res.data
          this.busy = false
        }
      })
    },
    sortBy() {
      this.orderFlag = !this.orderFlag
      this.page = 0
      this._getGoodsList(false)
    },
    selectInter(index) {
      this.priceLevel = index
      this.page = 0
      this._getGoodsList(false)
    },
    loadMore() {
      this.busy = true
      //1s 后加载下一页的数据
      setTimeout(() => {
        this.page ++
        this._getGoodsList(true)
        }, 300)
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
.goods-sort p .icon-arrow {
}
.goods-sort p .arrow_turn {
  transform: rotate(180deg);
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
.goods-items .price-item:hover {
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
  transition: all 1s;
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
  transition: all 0.5s;
}
.goods-info li .add-car:hover {
  background-color: #e09195;
}

</style>
