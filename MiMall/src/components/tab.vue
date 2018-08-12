<template>
<div class="tab">
  <ul class="tab-contain">
    <li class="tab-item"><router-link  tag="a" to="/">主页</router-link></li>
    <li class="tab-item"><router-link tag="a" to="/">商品</router-link></li>
  </ul>
</div>
</template>

<script>

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
</style>
