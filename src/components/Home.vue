<template>
    <div>       
      <MHeader>首页</MHeader>
      <div class="content">
          <Loading v-if="loading"></Loading>
          <!--template 一个无意义的标签  -->
          <template v-else>    
         <Swiper :swiperSlides="sliders"></Swiper>
         <div class="container">
             <h4>热门图书&gt;&gt;</h4>
         <ul>
             <li v-for="(hot,index) in hotBooks" :key="index">
                <img v-lazy="hot.bookCover">
                <div>
                <p><b>{{hot.bookName}}</b></p>
                 <p class="bookInfo">{{hot.bookInfo}}</p>
                 <p>售价:<span>{{hot.bookPrice + "￥"}}</span></p>
                </div>
              
             </li>
         </ul>
         </div>
          </template>
      </div>
     
    </div>
</template>
<script>
//引入组件 注册组件 使用组件
import MHeader from '../base/MHeader.vue'
//引入遮罩
import Loading from '../base/Loading'
//引入swiper
import Swiper from '../base/Swiper.vue'

//导入请求api
import {getAll} from '../api'
export default {
    created(){
        this.getData()
        // this.getSlider() //获取轮播
        // this.getHotBook() //获取热门图书
    },
     data(){
        return {
            sliders:[],
            hotBooks:[],
            loading:true
        }
    },
    methods: {
        //axios.all 整合后的代码
           async getData(){
               let [sliders,hotBooks] = await getAll() //反回的是一个数组
               this.sliders = sliders;
               this.hotBooks = hotBooks;
               //....数据获取完成
                this.loading = false
            }

    //    async getSlider(){
    //     //{data:sliders} 给data取别名 对象中的data必须和请求结果的data一致
    //         this.sliders = await getSliders()
    //     //    console.log(slidersa)
    //     },
    //     async getHotBook(){
    //         this.hotBooks = await getHots()
    //     }

    },
    computed: {
        
    },
    components: {
        MHeader,
        Swiper,
        Loading
    }
}
</script>

<style scoped lang="less">
    .container{
        h4{
            padding:10px 0;
            color:rgb(243, 91, 91);
            border-bottom: 1px solid #ccc;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-top:15px; 
                width: 50%;
                div{
                    padding-top: 10px;
                }
                p{
                    // font-size: 10px;
                    width: 75%;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    margin: 0 auto;
                    .bookInfo{
                        color: rgb(110, 110, 110);
                    }
                }
                p:last-child{
                    span{
                          margin-left: 20px;
                          color: red;
                    }
                }
                img{
                    width: 100%;
                }
            } 
        }
    }
</style>
<style>
.container{
    width:95%;
    margin:0 auto;
    }
</style>


