<template>
<div>
  <div class="header">
    <div class="logo">
      <img src="/static/images/logo.jpg">
    </div>
    <div class="sign">
        <p class="signin" v-if="showLoginOut" @click = "showLogin()">登录</p>
        <div class="signout" v-if="!showLoginOut">
          <span class="sign-name">catName</span>
          <span class="sign-out" @click="closeLoginOut">退出</span>
          <router-link to="/car" class="sign-car">购物车</router-link>
        </div>
    </div>
  </div>
  <my-dialog :is-show="showLogDialog" @on-close="closeDialog('showLogDialog')">
    <!-- my-dialog 插件控制弹窗，父组件绑定is-show属性传递给子组件，并且根据值判断弹窗是否展示 -->
    <div class="signin-slot">
      <p class="signin-logo">登录：</p>
      <form>
        <div class="signin-name">
          <span class="name-icon icon">1</span>
          <input type="input" name="username" placeholder="用户名" />
        </div>
        <div class="signin-psd">
          <span class="pwd-icon icon">2</span>
          <input type="password" name="password" placeholder="密码">
        </div>
        <button type="text" class="signin-submit" @click="showSignout">登录</button>
      </form>
    </div>
  </my-dialog>
</div>
</template>

<script>
import Dialog from './base/dialog'

export default {
  data() {
    return {
      showLogDialog: false,
      showLoginOut : true,
    }
  },
  methods: {
    closeDialog(attr) {
      this[attr] = false
    },
    // 显示登录窗口
    showLogin() {
      this.showLogDialog = true
    },
    showSignout() {
      this.showLogDialog = false;
      this.showLoginOut = false;
    },
    closeLoginOut() {
      this.showLoginOut = true
    }
  },
  components: {
    MyDialog: Dialog
  }
}
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
.sign .signout {
  font-size: 0;
}
.sign .signout span {
  font-size: 18px;
  margin-left: 10px;
  color: #8d8181;
}
.sign .signout .sign-car {
  font-size:18px;
  margin-left: 10px;
  color: #8d8181;
}
.sign .signout span:hover {
  color: #c40000;
}

.signin-slot {
  width: 100%;
}
.signin-slot .signin-logo {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.signin-slot .signin-name, .signin-slot .signin-psd {
  margin-bottom:20px;
  width: 50%;
  height:40px;
  border:1px solid #383841;
}
.signin-slot .signin-name input, .signin-slot .signin-psd input{
  width: 80%;
  height:98%;
}
.signin-slot .icon{
  display: inline-block;
  width: 18%;
  height: 100%;
  line-height: 40px;
}
.signin-slot .signin-submit {
  width:40%;
  margin-left:20px;
  background-color: #50a2c7;
  color: #fff;
  border: none;
  padding: 5px 0;
}

</style>
