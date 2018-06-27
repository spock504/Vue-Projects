<template>
  <!-- vue2.0中要有一个根节点 -->
  <div>   
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path:'/'}">
          <img src="../assets/logo.png">
        </router-link>
        <ul class="nav-list">
          <li> {{ username }}</li>
          <li v-if="username ===''" @click="logClick">登录</li>
          <li class="nav-pile">|</li>
          <li v-if="username !==''" @click="quit">退出</li>
          <li v-if="username ===''" @click="regClick">注册</li>
          <li class="nav-pile">|</li>
          <li @click="aboutClick">关于</li>
        </ul>
      </div>
    </div>
    <div class="app-content">
      <!-- 用于单页面缓存 -->
        <router-view></router-view>
    </div>
    <div class="app-footer">
      <p>&copy; 2018 spock504</p>
    </div>
    <my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>关于有很多话</p>
    </my-dialog>
    <my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <my-dialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <reg-form></reg-form>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from "./base/dialog"
import LogForm from "./logForm"
import RegForm from "./regForm"

export default {
  components:{
    MyDialog:Dialog,
    LogForm,
    RegForm
  },
  data () {
    return {
      isShowAboutDialog:false,
      isShowLogDialog:false,
      isShowRegDialog:false,
      username:''
    }
  },
  methods:{
    aboutClick(){
      this.isShowAboutDialog = true
    },
    logClick(){
      this.isShowLogDialog=true
    },
    regClick(){
      this.isShowRegDialog = true
    },
    closeDialog(attr){
      this[attr] = false
    },
    onSuccessLog(data){
      console.log(data)
      this.username = data.username
    },
    quit(){
      
    }
  }
}
</script>
<!-- 全局样式 -->
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.app-head-inner img {
  width:50px;
  margin-top:20px;
}
.app-head-inner .nav-list {
  float:right;
  overflow:hidden;
}
.nav-list li {
  float:left;
  cursor : pointer;
  padding: 0 10px;
}
.app-footer {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: #e3e4e8;
  margin-top: 30px;
  clear: both;
}

</style>
