<template>
    <div class="slide-show" @mouseout="runInv" @mouseover="clearInv">
        <div class="slide-img">
            <a :href="slides[nowIndex].href">
                <!-- nowIndex会自动切换 -->
                <transition name="slide-trans">
                    <img v-if="isShow" :src="slides[nowIndex].src">
                </transition>
                <transition name="slide-trans-old">
                    <img v-if="!isShow" :src="slides[nowIndex].src">
                </transition>
            </a>
        </div>
        <h2>{{ slides[nowIndex].title }}</h2>
        <ul class="slide-pages">
            <li @click='goto(prevIndex)'>&lt;</li>
            <li v-for='(item, index) in slides' @click='goto(index)'>
                <a :class="{on : index === nowIndex}">{{index+1}}</a>
            </li>
            <li @click='goto(nextIndex)'>&gt;</li>
        </ul>
    </div>
</template>

<script>
export  default {
    // 父组件传递轮播的数据以及轮播时间过来
    props:{
        slides: {
            type:Array,
            default:[]
        },
        inv:{
            type:Number,
            default:1000
        }
    },
    data(){
        return{
            nowIndex: 0,
            isShow:true
        }
    },
    computed:{
        // 逻辑判断：前一页到第一页时回到最后一页
        prevIndex(){
            if (this.nowIndex === 0) {
                return this.slides.length -1
            } else {
                return this.nowIndex -1
            }
        },
        //后一页到最后一页回到第一页
        nextIndex(){
            if (this.nowIndex === this.slides.length-1) {
                return 0
            } else {
                return this.nowIndex + 1
            }
        }
    },
    methods:{
        // goto() 到开始轮播的index页，当前页隐藏，后一页在定时器10ms后显示。而且数据需要传递给父组件
        goto(index){
            this.isShow = false
            setTimeout(()=>{
                this.nowIndex = index
                this.isShow = true
                this.$emit('onchange',index)
            },10)
        },
        runInv(){
            // setInterval()函数不断goto()到下一页
            this.invId = setInterval(() => {
                this.goto(this.nextIndex);
            }, this.inv)
        },
        clearInv(){
            clearInterval(this.invId)
        }
    },
    // mounted编译好的HTML挂载到页面完成后执行的事件钩子，在整个实例中只执行一次
    mounted(){
    this.runInv()
}

};
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}

.slide-show {
    width: 900px;
    height: 300px;
    overflow: hidden;
    position: relative;
    margin: 15px 15px 15px 0;
}
.slide-img {
    width: 100%;
}
.slide-img img {
    width: 100%;
    height:100%;
    position: absolute;
    top: 0;
}
.slide-show h2 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    background-color: #000;
    opacity: 0.5;
    text-align: left;
    padding-left: 15px;
}
.slide-pages {
    position: absolute;
    right: 15px;
    bottom: 10px;
    margin-right: 20px;
}
.slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
}
.slide-pages li .on {
  color: #c40000;
  text-decoration: underline;
}

</style>
