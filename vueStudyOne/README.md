# vuestudyone

> this is a vue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
### 文件信息：
```
|-build   //配置webpack的基本配置，开发环境，生产环境配置
|-db.json  //存放组件需要的数据
|- src  //放置组件和文件的入口
|---   assets  //存放图片  
|---   components   //页面供应的各类组件  
|---   pages   //添加页面  
|---   main.js  //初始化vue实例，并使用需要的插件
```
### 插件信息：  
slideShow 用于展示幻灯片 ，接受参数slides,速度slideSpeed  
dialog: 用于设置弹窗的基本样式，接受参数isShow  
counter: 用于数据加减，接受参数max,min，其中用watch监听number的改变  
selection: 单选框，接受参数selections   
multiselections: 多选框




