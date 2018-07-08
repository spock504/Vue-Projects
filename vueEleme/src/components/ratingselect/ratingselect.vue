<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" @click='select(2, $event)' :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" @click='select(0, $event)' :class="{'active':selectType  === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" @click='select(1, $event)' :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
            <i class="iconfont icon-gou"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const NEGATIVE = 1
const POSITIVE = 0
const ALL = 0

export default {
    props:{
        ratings:{ //商品评论
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default:false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all:'全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        },
    },
    computed: {
        // 计算属性筛选ratings中的值
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE
            })
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE
            })
        }
    },
    methods: {
        select(type,event){
            if (!event._constructed) {
                return
            }
            // this.selectType = type
            this.$emit('increment','selectType',type) // 子组件触发父组件的方法 increment
            //  console.log(this.selectType)
        },
        toggleContent(event) {
        if (event._constructed) {
            return
        }
        //this.onlyContent = !this.onlyContent  不能在子组件中更改值，直接将非 值更改后传递
        this.$emit('increment','onlyContent',!this.onlyContent)
        console.log(this.onlyContent)
    }
    }
};
</script>

<style lang="stylus" type="stylesheet/stylus">
@import "ratingselect.styl"

</style>