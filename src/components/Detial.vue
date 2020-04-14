<template>

    <div class="detial">  
         <MHeader :back="true" >详情</MHeader>
         <div class="content" >
             <img :src="book.bookCover">
             <h3>{{book.bookName}}</h3>
             <p class="info">{{book.bookInfo}}</p>
             <p>售价:<span class="redSpan">{{book.bookPrice + "￥"}}</span></p>
              <div>
                  <button type="button" @click="show">修改图书信息</button>

              </div>
              <div class="model" v-if="showModal">
                  <h4>修改书籍信息</h4>
                  <div>
                    <span>书籍名称</span>
                    <p><input type="text" v-model="book.bookName"></p>
                    <span>书籍信息</span>
                    <p><input type="text" v-model="book.bookInfo"></p>
                    <span>书籍价格</span>
                    <p><input type="text" v-model.number="book.bookPrice"></p>
                  </div>
                  <div class="flex-btn">
                      <button type="button" @click="updata">确认修改</button>
                       <button type="button" @click="showModal=false">取消</button>
                  </div>
              </div>
              <div class="showModel" v-if="showModal"></div>
         </div> 
    </div>
   
</template>
<script>
import MHeader from '../base/MHeader.vue'

import {oneBook,updataBook} from '../api/index.js'
export default {
    data(){
        return {
            book:{},
            showModal:false
        }
    },
    watch:{
        $route(){ //只要路径变化 页面就自动刷新
             this.getOneBook()
        }
    },
    created () {
       this.getOneBook()
    },
    methods: {
        show(){
            this.showModal = true;
        },

        async updata(){
            await updataBook(this.bid,this.book)
                  this.$router.push('/list')     
           
        },
        
        async getOneBook(){
          this.book = await oneBook(this.bid)
          Object.keys(this.book).length>0?void 0:this.$router.push('/list')
        }
    },
    computed: {
        bid(){
            return this.$route.params.bid //当前路由上的参数

        }
    },
    components: {
        MHeader,
    }
}
</script>

<style scoped lang="less">
img{
    width: 100%;
}
    .detial{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 100;
    }
    .content{
       padding-top: 10px;
        bottom: 0;
        h3{
           padding: 5px 10px;  
        }
        p.info{
            color: rgb(110, 110, 110); 
        }
        p,div{
            padding: 3px 10px;
            .redSpan{
                color: red;
                margin-left: 20px
            }
        }
        div{
            padding-top: 5px;
            button{
                 height: 30px;
                 width: 100px;
                line-height: 30px;
                border: 1px solid ;
                border-radius: 5px;
                background: #000;
                color: white;
            }
        }
         .model{
             position: fixed;
             top: 50%;
             margin-top: -122.5px;  
             z-index: 200;
             width: 100%;
             height: 245px;
             background: white;
            h4{
                padding-top: 10px;
                text-align: center;
            }
            div{
                p{
                    padding: 5px;
                }
                input{
                    border-bottom: 1px solid #eee;
                    width: 100%;
                    height: 25px;
                }
                span{
                    color: #8d8c8c;
                }
                
            }
            .flex-btn{
                display: flex;
                justify-content: space-around;
                button{
                    background: #00ce26;
                }
                button:last-child{
                      background: rgb(128, 126, 126);
                }
            }
        }
        .showModel{
            position:fixed;
            top: 0;
            left: 0;
            z-index: 150;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: .6;

        }

    }
</style>