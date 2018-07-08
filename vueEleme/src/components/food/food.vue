<template>
    <transition name="fade">
    <div v-show="showFlag" class="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image">
                <div class="back" @click="hide">
                    <i class="iconfont icon-weibiaoti6-copy"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <div class="sell-count">月售{{food.sellCount}}</div>
                    <div class="rating">好评率{{food.rating}}%</div>
                </div>
                    <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <transition name="pay">
                    <!-- 没有选中或者选中的值为0，才显示,否则就显示添加或删减按钮 -->
                    <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
                </transition>
            </div>
            <split></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品信息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h2 class="title"></h2>
            </div>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <ratingselect @increment="incrementTotal" :ratings='food.ratings' :select-type="selectType" :only-content="onlyContent"  :desc="desc"></ratingselect>
                <!-- 评论消息 -->
                <div class="rating-wrapper">
                    <!-- 遍历food的评论 -->
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px" v-for="rating in food.ratings">
                            <!-- 右边用户名和头像使用绝对定位 -->
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" width="12" height="12" :src="rating.avatar">
                            </div>
                            <!-- 左边的时间和评论 -->
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <!-- 根据评论的rateType判断小图标的样式 -->
                                <i class="iconfont" :class="{'icon-damuzhi':rating.rateType === 0,'icon-down':rating.rateType === 1,}"></i>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0"></div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartControl/cartControl'
import BScroll from 'better-scroll'
import split from '../split/split'
import Vue from 'vue'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date';

const ALL =2 
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc:{
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        components: {
            cartcontrol,
            split,
            ratingselect
        },
        methods: {
            show() {
                // 来自good组件的调用,显示详细菜单，并且使scroll组件可点击
                this.showFlag = true,
                this.selectType = ALL,
                this.onlyContent = true,
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$el,{
                            click: true
                        })
                     } else {
                        this.scroll.refresh()
                    }
                })
            },
            hide() {
                this.showFlag = false
            },
            addFirst(event) {
                if (event._constructed) {
                    return
                }
                Vue.set(this.food, 'count', 1)
                console.log(this.food.count)
            },
            incrementTotal(type, data) {
                this[type] = data 
                this.$nextTick(() => {
                this.scroll.refresh();
            })
            },
            // 判断评论列表怎样展示
            needShow(type, text) {
                // 选中onlyContent按钮，并且文本没有内容则不显示
                if (this.onlyContent && !text) {
                    return false
                }
                // 满意 推荐 吐槽 三个按钮的状态选中则，显示对应部分
                if (this.selectType === ALL) {
                    return true
                } else {
                    return type === this.selectType
                }
            }
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
    },

    };
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "food.styl";
</style>