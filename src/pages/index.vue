<template>
    <div class="index-wrap">
        <div class="index-left">
          <slide-show :slides="slides" :inv="slideSpeed" @onchange="doSomethingOnSlideChange"></slide-show>
          <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                推荐
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-people"></Icon>
                关注
            </MenuItem>
            <MenuItem name="3">
                <Icon type="settings"></Icon>
                设置
            </MenuItem>
          </Menu>

            <!-- <div class="index-board-list"> -->
              <!-- class类的拼接 ，根据index设置最后一行边距为0,并且设置不同的背景图-->
<!--                 <div class="index-board-item"
                v-for="(item,index) in boardList"
                :class="[{'line-last':index % 2 !== 0},'index-board-'+item.id]">
                    <div class="index-board-item-inner">
                        <h2>{{item.title}}</h2>
                        <p>{{item.description}}</p>
                        <div class="index-board-button">
                            <a href="" class="button">立即购买</a>
                        </div>
                    </div>
                </div>
            </div> -->
      </div>

      <div class="index-right">
            <Card style="width:280px">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            写文章
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            Change
        </a>
        <ul>
            <li v-for="item in randomMovieList">
                <a :href="item.url" target="_blank">{{ item.name }}</a>
                <span>
                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                    {{ item.rate }}
                </span>
            </li>
        </ul>
    </Card>
<!--             <div class="index-left-block">
                <h2>全部产品</h2>
                <div v-for="product in productList">
                    <h3>{{ product.title}}</h3>
                    <ul>
                        <li v-for="item in product.list">
                            <a :href="item.url">{{item.name}}</a>
                            <span v-if='item.hot' class="hot-tag">Hot</span>
                        </li>
                    </ul>
                    <div v-if='!product.last' class="hr"></div>
                </div>
            </div>
        <div class="index-left-block lastest-news">
            <h2>最新消息</h2>
            <ul>
                <li v-for='item in newList'>
                    <a :href="item.url" class="new-item">{{item.name}}</a>
                </li>
            </ul>
        </div> -->
    </div>
    </div>
</template>

<script>
import slideShow from '../components/slideShow'
    export default {
        components:{
            slideShow
        },
                data () {
            return {
                slideSpeed:2000,
                slides:[
                // script中的src需要使用require通过weboack解析地址
                {
                  src: require('../assets/slideShow/pic1.jpg'),
                  title: '打上花火',
                  href: 'detail/count'
                },
                {
                  src: require('../assets/slideShow/pic2.jpg'),
                  title: '知否知否',
                  href: 'detail/forecast'
                },
                {
                  src: require('../assets/slideShow/pic3.jpg'),
                  title: '纸短情长',
                  href: 'detail/analysis'
                },
                {
                  src: require('../assets/slideShow/pic4.jpg'),
                  title: '烟花易冷',
                  href: 'detail/publish'
                }],
                  boardList: [
                    {
                      title: '开放产品',
                      description: '开放产品是一款开放产品',
                      id: 'car',
                      toKey: 'analysis',
                      saleout: false
                    },
                    {
                      title: '品牌营销',
                      description: '品牌营销帮助你的产品更好地找到定位',
                      id: 'earth',
                      toKey: 'count',
                      saleout: false
                    },
                    {
                      title: '使命必达',
                      description: '使命必达快速迭代永远保持最前端的速度',
                      id: 'loud',
                      toKey: 'forecast',
                      saleout: true
                    },
                    {
                      title: '勇攀高峰',
                      description: '帮你勇闯高峰，到达事业的顶峰',
                      id: 'hill',
                      toKey: 'publish',
                      saleout: false
                    }
                ],
                newList:[],
                productList:{
                    pc:{
                        title:'PC产品',
                        list:[
                        {
                          name: '数据统计',
                          url: 'http://starcraft.com'
                        },
                        {
                          name: '数据预测',
                          url: 'http://warcraft.com'
                        },
                        {
                          name: '流量分析',
                          url: 'http://overwatch.com',
                          hot: true
                        },
                        {
                          name: '广告发布',
                          url: 'http://hearstone.com'
                        }
                        ]
                    },
                    app:{
                        title:'手机应用类',
                        last:true,
                        list:[
                        {
                          name: '91助手',
                          url: 'http://weixin.com'
                        },
                        {
                          name: '产品助手',
                          url: 'http://twitter.com',
                          hot: true
                        },
                        {
                          name: '智能地图',
                          url: 'http://maps.com'
                        },
                        {
                          name: '团队语音',
                          url: 'http://phone.com'
                        }
                        ]
                    }
                },
                theme1:'light',
                movieList: [
                    {
                        name: 'The Shawshank Redemption',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
                    },
                    {
                        name: 'Leon:The Professional',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 9.4
                    },
                    {
                        name: 'Farewell to My',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 9.5
                    },
                    {
                        name: 'Forrest Gump',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 9.4
                    },
                    {
                        name: 'Life Is Beautiful',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 9.5
                    },
                    {
                        name: 'Spirited Away',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 9.2
                    },
                    {
                        name: 'Schindlers List',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 9.4
                    },
                    {
                        name: 'The Legend of 1900',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 9.2
                    },
                    {
                        name: 'WALL·E',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 9.3
                    },
                    {
                        name: 'Inception',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 9.2
                    }
                ],
                randomMovieList: []
            }
        },
        // 页面创建成功就向数据取值
        created(){
            this.$http.get('api/getNewList')
            .then((res) =>{
              // console.log(res)
                this.newList = res.data
            },(err) => {
                console.log(err);
            });
            this.changeLimit();
        },
        methods:{
            doSomethingOnSlideChange(){
                // console.log("doSomethingOnSlideChange翻页了")
            },
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 5);
            }
        },
    };
</script>

<style scoped>
.index-wrap {
    width:1200px;
    margin:0 auto;
    overflow:hidden;
}
.index-left {
    float:left;
    width:900px;
    text-align:left;
    overflow: hidden;
}
.index-right {
  margin-top: 12px;
  float: right;
  width: 280px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}

.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}

.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}

.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
  width:80px;
  height:30px;
  line-height:30px;
  text-align:center;
  color:#fff;
  background-color:#4fc08d;
}

.lastest-news {
  min-height: 512px;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
