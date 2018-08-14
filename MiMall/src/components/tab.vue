<template>
<div class="tab">
  <ul class="tab-contain">
    <li class="tab-item"><router-link  tag="a" to="/">主页</router-link></li>
    <li class="tab-item"><span>{{tabTitle}}</span></li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      pathInfo: [
        {path: '/'},
        {path: '/car'},
        {path: '/address'}
      ],
      pathMap: {
        '/': '商品信息',
        '/car': '购物车信息',
        '/address': '地址信息',
      }
    }
  },
  //计算属性：逻辑计算，根据pathMap数据中的地址绑定显示的文字
  computed: {
    tabTitle() {
      return this.pathMap[this.$route.path]
    }
  }
}
</script>
<style type="text/css">
 .tab {
  padding: 20px 100px;
  box-sizing: border-box;
  background-color: #f3f0f0;
 }
 .tab-contain {
  font-size: 0;
 }
 .tab-contain .tab-item {
  display: inline-block;
  font-size: 18px;
  margin-right: 10px;
 }
 .tab-contain .tab-item span {
  margin-left:10px;
  color: #de1442;
}
</style>
