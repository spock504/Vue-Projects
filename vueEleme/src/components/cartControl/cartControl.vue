<template>
    <div class="cartControl">
        <transition name="fade">
            <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCount($event)">
                <transition name="inner">
                    <span class="inner iconfont icon-jian"></span>
                </transition>
            </div>
        </transition>
        <span class="cart-count" v-show="food.count > 0">{{food.count}}</span>
        <span class="cart-add iconfont icon-jia" @click.stop.prevent="addCount($event)"></span>
    </div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            decreaseCount(event){
                // 去掉自带点击事件
                if (!event._constructed) {
                    return
                }
                this.food.count --
            },
            addCount(event){
                if (!event._constructed) {
                    return
                }
                if (!this.food.count) {
                    Vue.set(this.food,'count',1)
                } else {
                    this.food.count ++
                }
                this.$emit('increment', event.target) //将增加的事件传递给父组件goods
            }
        },
        created(){
            // console.log(this.food)
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "cartControl.styl"
</style>