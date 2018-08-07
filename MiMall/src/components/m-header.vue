<template>
<div class="header">
  <div class="logo">
    <img src="/static/images/logo.jpg">
  </div>
  <div class="sign">
      <p class="signin">登录</p>
  </div>
</div>
</template>

<script>

</script>
<style type="text/css" scoped>
.header {
  width: 100%;
  height: 100px;
  padding: 20px 100px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  width: 121px;
  height: 75px;
}
.logo img {
  width: 100%;
  height: 100%;
}

.sign {
  cursor: pointer;
}
.sign .signin {
  color: #a29d9d;
}
.signin:hover {
  color: #f11111;
}


</style>
