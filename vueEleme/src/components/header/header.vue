<template>
    <div class="header">
        <!-- main info -->
        <div class="content-wrap">
            <div class="avator">
                <img width="64px" height="64px" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟到达
                </div>
                <div v-if="seller.supports" class="support">
                    <!-- 根据不同的类，设置不一样的图标 -->
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div v-if="seller.supports" class="supports-count" @click="showDetail">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon iconfont icon-zuoyoujiantou"></i>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper"  @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon iconfont icon-zuoyoujiantou"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
        <div v-show="isShow" class="detail" transition="fade" @click="hideDetail">
            <div class="detail-wrap clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <!-- 自适应布局，使用span样式有兼容性问题 -->
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠消息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item, index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="iconfont icon-cha"></i>
            </div>
        </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star'
    export default {
        props:{
            seller:{
                type: Object
            }
        },
        components:{
            star
        },
        data(){
            return {
                isShow: false
            }
        },
        methods:{
            showDetail(){
                this.isShow = true
            },
            hideDetail(){
                this.isShow = false
            }
        },
        created(){

            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'header.styl'
</style>
