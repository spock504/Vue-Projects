<template>
  <div>
    <!-- 头部 -->
    <v-header :seller="seller"></v-header>
    <!-- 中部导航栏 -->
    <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <!-- 路由改变时，显示相应的内容 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from './components/header/header'
import data from 'common/json/data.json';
import {urlParse} from 'common/js/util';


// 状态判断用常量定义，更有语义化
const ERR_OK = 0


export default {
  components:{
    VHeader
  },
  data(){
    return {
      seller:{},
      id: (() => {
      let queryParam = urlParse();
      console.log(queryParam);
      return queryParam.id;
    })()
    }
  },
  created(){
    // this.$http.get('./api/seller')
    //     .then((res) => {
    //       // console.log(res.json()) //json() 返回的是一個promise對象
    //       res = res.body
    //       if (res.errno === ERR_OK) {
    //         this.seller = res.data
    //         this.seller = Object.assign({},this.seller,res.data) //合并目标对象
    //       }
    // })
    this.seller = data.seller
    // console.log(this.seller)
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/mixin.styl";

/* 三等分flex布局 */
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-1px(rgba(7,17,27,0.1));
}

.tab-item {
  flex: 1;
  display: block;
  text-align: center;
  font-size: 14px;
  color: rgb(77,85,93);
}
.tab-item .active {
  color: rgb(240, 20, 20);
}
</style>
