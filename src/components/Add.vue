<template>
    <div>
     <MHeader>添加</MHeader>
     <div class="content">
         <div class="model">
                  <h4>添加书籍</h4>
                  <div>
                     <span>书籍名称</span>
                    <p><input type="text" v-model="book.bookName" id="bookName"></p>
                    <span>书籍信息</span>
                    <p><input type="text" v-model="book.bookInfo" id="bookInfo"></p>
                    <span>书籍价格</span>
                    <p><input type="text" v-model.number="book.bookPrice" id="bookPrice"></p>
                     <span>书籍图片</span>
                    <p><input type="text" v-model.number="book.bookCover" id="bookCover"></p>
                  </div>
                  <div class="flex-btn">
                      <button type="button" @click="add">确认添加</button>
					  <br><br>
					  <button type="button" @click="goNumbes">数万计列表优化</button>
                  </div>
              </div>
     </div>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue'
import {addBook} from '../api/index.js'
export default {
    data(){
        return {
            book:{}
        }
    },
    created () {
        
    },
    methods: {
        async add(){
            await addBook(this.book)
            this.$router.push('/list');
        },
		goNumbes(){
			this.$router.push('/listnum');
		}	
    },
    computed: {
        
    },
    components: {
        MHeader
    }
}
</script>

<style scoped lang="less">
.content{
    background: #fff;
}
.model{ 
             z-index: 200;
             margin: 0 auto;
             width: 80%;
             height: 245px;
             background: white;
            h4{
                padding: 10px 0;
                text-align: center;
            }
            div{
                p{
                    padding: 10px 0 ;
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
                padding-top: 10px;
                button{
                    width: 100%;
                    height: 30px;
                    border: none;
                    line-height: 30px;
                    color: white;
                    background: #00ce26;
                    border-radius: 5px;
                }
            
            }
        }
</style>