<template>
    <div class="star">
        <!-- 根据计算属性starType的值定义不同的样式 -->
        <div class="star-item" :class="starType">
            <span v-for="item in itemClass" :class="item" class="star-item"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = "on"
const CLS_HALF = "half"
const CLS_OFF = "off"

export default{
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    computed:{
        starType(){
            return 'star-'+ this.size
        },
        itemClass(){
            let result=[]
            let score=Math.floor(this.score*2)/2 //向下取0.5的倍数
            let hasDecimal = score%1 !==0   //判断有没有小数部分，
            let integer = Math.floor(score)  //判断整数部分，全星
            for(let i=0; i<integer;i++){
                result.push(CLS_ON)
            }
            // 判断要不要添加半颗星
            if(hasDecimal){
                result.push(CLS_HALF)
            }
            // 将剩余的不亮的星星填满
            while(result.length<LENGTH){
                result.push(CLS_OFF)
            }
            return result
        }
    }
};
</script>

<style lang="stylus" type="stylesheet/stylus">
@import "star.styl"
</style>