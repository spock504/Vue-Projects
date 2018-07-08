<template>
    <div class="goods">
        <!-- vue 2.0 属性写法,ref 可以写驼峰 -->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item border-1px" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
                    <span class="text">
                        <!-- v-show控制图标的显示 -->
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px"  @click="selectFood(food,$event)">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrap">
                                    <cartcontrol :food="food" @increment="incrementTotal"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div>
            <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
            <food :food="selectedFood" ref="food"></food>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import data from 'common/json/data.json';
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartControl/cartControl'
import food from '../food/food'

export default {
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        shopcart,
        cartcontrol,
        food
    },
    data(){
        return {
            goods: [],
            listHeight:[],
            scrollY: 0,
            selectedFood:{}
        }
    },
    computed: {
        currentIndex() {
            for ( let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i+1]
                // 左边的高度在右边高度区间时，返回对应索引
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }   
            // 如果listHeight 数组没有值返回0
            return 0;
        },
        // 选择的商品数
        selectFoods(){
            let foods =[]
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    created(){
        // this.$http.get('./api/goods')
        //     .then((res) => {
        //         res = res.body
        //         this.goods = res.data
        //         console.log(res.data)
                // this.goods = seller.goods
            // })
        this.goods = data.goods
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$nextTick(() => {
            // DOM的异步更新数据，是在nextTick回调中进行的，
            // 虽然改变数据，但是DOM并没有变化，则初始化下列方法中的BScroll时会出问题
            this._initScroll()
            this._calculateHeight()
        })
    },
    methods:{
        selectMenu(index, event){
            // 去掉自带click事件的点击
            if (!event._constructed) {
                return
            }
            // 根据索引，获取点击的右侧对象
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            let el = foodList[index]
            this.foodsScroll.scrollToElement(el, 300)
            // console.log(index)
        },
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click:true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                // 能够实时获得探针的位置,结合下边定义将左侧的滚动距离实时传送
                probeType:3,
                click:true
            })
            this.foodsScroll.on('scroll',(pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight() {
            // 将每一个区间的高度都添加到数组中,listHeight得到的就是一个高度递增的数组
            // 获取DOM元素
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            let height= 0
            this.listHeight.push(height)
            for (let i=0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        incrementTotal(target){
            // 访问子组件的变量
            this.$refs.shopcart.drop(target) //shopcart 元素的drop事件，见shopcart
        },
        selectFood(food, event) {
            if (!event._constructed) {
                return
            }
            this.selectedFood = food
            this.$refs.food.show() //列表点击事件之后，显示food组件（调用food的show方法）
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "goods.styl"
</style>
