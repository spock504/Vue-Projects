<template>
<div class="footer">
  <div class="footer-contain">
    <div class="area-select">
      <span>地区：</span>
      <select>
        <option value="中国">中国</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
      </select>
    </div>
    <ul>
      <li>隐私策略</li>
      <li>团队合作</li>
      <li>关于我们</li>
      <li>&copy;2018 taoMall.com 版权所有</li>
    </ul>
  </div>
</div>
</template>

<script>

</script>
<style type="text/css">
.footer {
  width: 100%;
  height: 80px;
  background-color: #bbb;
  overflow: hidden;
}
.footer-contain {
  padding:0 120px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-contain .area-select {
  flex-width: 200px;
  width: 200px;
}
.footer-contain ul {
  display: flex;
}
.footer-contain ul li {
  margin-left: 10px;
}
</style>
