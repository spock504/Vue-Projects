<template>
<div class="ratings">
    <div class="ratings-content">
        <div class="overview">
            <div class="overview-left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
                <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <star :size="36" :score="seller.serviceScore"></star>
                    <span class="score">{{seller.serviceScore}}</span>
                </div>
                <div class="score-wrapper">
                    <span class="title">商品评分</span>
                    <star :size="36" :score="seller.foodScore"></star>
                    <span class="score">{{seller.foodScore}}</span>
                </div>
                <div class="delivery-wrapper">
                    <span class="title">送达时间</span>
                    <span class="delivery">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <split></split>
        <ratingselect  @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :ratings="ratings" :desc="desc"></ratingselect>
        <div class="rating-wrapper border-1px">
            <ul>
                <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
                    <div class="avatar">
                        <img width="28" height="28" :src="rating.avatar">
                    </div>
                    <div class="content">
                        <h1 class="name">{{rating.username}}</h1>
                        <div class="star-wrapper">
                            <star :size="24" :score="rating.score"></star>
                            <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                        </div>
                        <p class="text">{{rating.text}}</p>
                        <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                            <i class="iconfont icon-damuzhi"></i>
                            <span class="item" v-for="item in rating.recommend">{{item}}</span>
                        </div>
                        <div class="time">
                            {{rating.rateTime | formatDate}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'
import data from 'common/json/data.json' 
const ALL = 2
export default {
    props: {
        seller: {
            type: Object
        }
    },
    created() {
//      this.$http.get('/api/ratings').then((response) => {
//        response = response.body;
//        if (response.errno === ERR_OK) {
//          this.ratings = response.data;
//          this.$nextTick(() => {
//            console.log(this.$el);
//            this.scroll = new BScroll(this.$el, {click: true});
//          });
//        }
//      });
      this.ratings = data.ratings;
      this.$nextTick(() => {
        console.log(this.$el);
        this.scroll = new BScroll(this.$el, {click: true});
      });
    },
    data() {
        return {
            ratings: [],
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '满意',
                negative: '吐槽'
            }
        }
    },
    components:{
        star,
        split,
        ratingselect
    },
    methods:{
          incrementTotal(type, data) {
                this[type] = data 
                this.$nextTick(() => {
                this.scroll.refresh();
            })
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return 
                }
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
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'ratings.styl'
</style>
