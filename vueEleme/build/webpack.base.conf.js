'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
} //定义了当前项目的根目录



module.exports = {
  context: path.resolve(__dirname, '../'),
  // webpack编译的入口文件
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    // 生成的文件名字
    filename: '[name].js',
    // 请求的静态资源的绝对路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全文件后缀
    extensions: ['.js', '.vue', '.json'],
    // 别名,只针对于js库，css的引入还是要写相对路径，不能省略
    alias: {
      '@': resolve('src'),
      // vue:'vue/dist/vue.js',
      'components': path.resolve(__dirname, '../src/components'),
      'common': path.resolve(__dirname, '../src/common'),
    }
  },
  module: {
    // 对某一类型的字段用loader去处理
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        // 当图片大小小于10kb时，生成字符串打包到编辑后js文件里，超过10kb就会单独生成文件
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
