<template>
    <div class="slide-show" @mouseout="runInv" @mouseover="clearInv">
        <div class="slide-img">
            <a :href="slides[nowIndex].href">
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
        prevIndex(){
            if (this.nowIndex === 0) {
                return this.slides.length -1
            } else {
                return this.nowIndex -1
            }
        },
        nextIndex(){
            if (this.nowIndex === this.slides.length-1) {
                return 0
            } else {
                return this.nowIndex + 1
            }
        }
    },
    methods:{
        goto(index){
            this.isShow = false
            setTimeout(()=>{
                this.nowIndex = index
                this.isShow = true
                this.$emit('onchange',index)
            },10)
        },
        runInv(){
            this.invId = setInterval(() => {
                this.goto(this.nextIndex);
            }, this.inv)
        },
        clearInv(){
            clearInterval(this.invId)
        }
    },
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
    height: 500px;
    overflow: hidden;
    position: relative;
    margin: 15px 15px 15px 0;
}
.slide-img {
    width: 100%;
}
.slide-img img {
    width: 100%;
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
