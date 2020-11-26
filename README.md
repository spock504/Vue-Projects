# Vue 项目集
## 1. vueStudyOne  
**PC端**  
> * 页面包括： 轮播图，支付框以及登录框等 
> * 基本组件包括：单选框，多选框，下拉框，数量框等  

预览: http://47.115.188.249:8000

## 2. vueEleme  
**仿饿了么外卖app**  
> * 核心商家模块：包括商品，评论，商家介绍等模块
> * 开发方法： Vue-cli脚手架初始化项目，模拟json后端数据，了解webpack打包原理
> * 第三方组件： vue-router开发单页面应用，vue-resource与后端数据交互，stylus编写模块化css
> * 设计模式： 解决移动端1px边框问题，运用移动端经典的css sticky footer布局，采用flex布局  

预览: http://47.115.188.249/element

## 3. vue-music  
**音乐播放器**  
- [x]  MVVM框架：Vue.js （版本2.x） 
- [x]  状态管理：Vuex
- [x]  前端路由：Vue Router
- [x]  服务端通讯：axios、jsonp
- [x]  移动端滚动库：better-scroll
- [x]  构建工具：webpack 2.0
- [x]  源码：es6

## 4. MiMall
**小米商城**
> * 该项目是对小米商城系统的模仿，实现了从浏览商品到结算商品的整个过程，其中包括了商品列表、根据价格筛选商品、对商品排序、登录、加入购物车、结算等功能 前台使用vue-cli构建了请求服务器，使用了Vue框架，还使用了vue-router、axios、Vuex等中间件。
> * 用户名：sunyu 密码：123456


------ ------ 
服务器nginx 相关配置信息：
路由的两种模式：history、hash模式
- **history模式**
  vueStudyOne 
  1. 项目配置：
    `config/index.js` 文件中设置 `{assetsPublicPath: '/'}` ，并且router `src/main.js`中模式设置为 `mode:'history'`

  2. nginx设置：
  ```js
    server {
        listen       8000;
        server_name  localhost;

        access_log  logs/host8000.access.log;

        location / {
            root   /usr/local/nginx/html/study/;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html; // 配合history模式，以及解决history模式下刷新404的问题
        }
    }
  ```
3. 访问地址
  http://47.115.188.249:8000/



  - **hash模式**
   vueEleme
  1. 项目配置：
    `config/index.js` 文件中设置 `{assetsPublicPath: './'}` ，并且router `src/main.js`中模式不设置history

  2. nginx设置：
  ```js
    server {
        listen       80;
        server_name  localhost;

        access_log  logs/host.access.log;

        location / {
            root   /usr/local/nginx/html/;
            index  index.html;
        }

        location /element {
            alias  html/element;
            index  index.html index.htm;
        }
    }
  ```
  3. 访问地址
    http://47.115.188.249/element/


