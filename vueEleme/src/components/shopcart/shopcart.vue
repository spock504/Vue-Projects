<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <!-- 当数量大于0时，添加样式 -->
                    <div class="logo" :class="{'highlight':totalCount > 0}">
                        <i class="iconfont icon-gouwuche" :class="{'highlight':totalCount > 0}"></i>
                    </div>
                    <!-- 左下角图标的数量 -->
                    <!-- V-SHOW 购买商品时显示右上角图标 -->
                    <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <!-- 阻止点击冒泡事件 -->
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-content">
            <div v-for="ball in balls">
                <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div v-show="ball.show" class="ball">
                        <!-- inner-hook表示用来对js进行选择的 -->
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="fade">
        <div class="shopcart-list" v-show="listshow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition>
        <transition name="fade">
            <div class="list-mast" v-show="listshow" @click="hideList()"></div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartControl/cartControl'
import BScroll from 'better-scroll'

    export default {
        props: {
            selectFoods:{
                type:Array,
                default() {
                    return [{price:10, count: 2}]
                }
            },
            deliveryPrice:{
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                balls:[{show:false}, {show:false}, {show:false}, {show:false}, {show:false}],
                dropballs:[],
                fold: true      //控制列表折叠状态
            }
        },
        components:{
            cartcontrol
        },
        computed: {
            totalPrice(){
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                })
                return total
            },
            totalCount() {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice} 起送`
                } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff} 起送`
                } else {
                    return '去结算'
                }
            },
            payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
            return 'enough'
            }
            },
            listshow() {
                // 都没有选择则无点击事件
                if (!this.totalCount) {
                    this.fold = true
                    return false
                }
                let show = !this.fold
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            })
                        } else {
                            this.scroll.refresh()
                        }
                    })
                }
                return show
            }
        },
        methods:{
            drop(el){
                // console.log(el)  //el为该组件的DOM元素
                // 拿到第一个show为true的小球
                for (var i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropballs.push(ball);
                        return;
                    }
                }
            },
              beforeEnter(el) {
                // 循环所有show为true的小球
                let count = this.balls.length;
                while (count--) {
                  let ball = this.balls[count];
                  // 运动show为true的小球
                  if (ball.show) {
                    // 获得元素相对于与视口的位置 ，left和right就是相对于视口的偏移
                    let rect = ball.el.getBoundingClientRect();
                    // 获得小球的偏移量
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    // 外层元素做一个纵向的动画
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    // 内层元素做横向运动的动画
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                  }
                }
              },
              enter(el) {
        //          let rf = el.offestHeight;
                this.$nextTick(() => {
                  el.style.webkitTransform = 'translate3d(0,0,0)';
                  el.style.transform = 'translate3d(0,0,0)';
                  let inner = el.getElementsByClassName('inner-hook')[0];
                  inner.style.webkitTransform = 'translate3d(0,0,0)';
                  inner.style.transform = 'translate3d(0,0,0)';
                });
              },
              afterEnter(el) {
                // console.log(this.dropballs.shift())
                let ball = this.dropballs.shift();
                // 状态重置
                if (ball) {
                  ball.show = false;
                  el.style.display = 'none';
                }
              },
              toggleList() {
                if (!this.totalCount) {
                    return
                }
                this.fold = !this.fold
              },
              empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0
                })
              },
              hideList() {
                this.fold = true
              },
              pay() {
                if (this.totalPrice < this.minPrice) {
                    return
                }
                window.alert('需要支付' + this.totalPrice + '元')
              }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "shopcart.styl"
</style>
