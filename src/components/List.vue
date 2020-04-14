<template>
    <div>
       <MHeader>列表</MHeader>
       <div class="content" ref="scroll" @scroll="loadMore">
           <div class="container">
            <ul>
                <!-- 路径参数params:{} -->
                <router-link v-for="(book,index) in books" :key="index" :to="{name:'detial',params:{bid:book.bookId}}" tag="li">
                    
                    <div class="imgsize">
                      <img v-lazy="book.bookCover">
                    </div>
                    <div>
                        <h4>{{book.bookName}}</h4>  
                        <p class="bookInfo">{{book.bookInfo}}</p>
                        <p class="bookPrice">售价: <span> {{book.bookPrice + "￥"}}</span></p>
                        <p><button type="button" @click.stop="remove(book.bookId)">删除</button>
                            <button type="button" @click.stop="add(book.bookId)">购买</button>
                        </p>
                    </div>
                </router-link>
            </ul>
            <div @click="more">上下拉插件vue-pull-refresh</div>
           </div>
     </div>
    </div>
</template>
<script>
import MHeader from "../base/MHeader.vue";
import { pagination, removeBook ,addShop} from "../api/index.js";
export default {
  data() {
    return {
      books: [],
      offset: 0, //偏移量（请求个数）
      hasMore: true, //第一次请求后是否有更多\
      isLoading: false //是否正在加载
    };
  },
  watch: {
    $route() {
      //只要路径变化 页面就自动刷新
      this.getBook()
    }
  },
  mounted() {
    //元素挂载后
    let scroll = this.$refs.scroll //获取到当前需要拖拽的元素
    let top = scroll.offsetTop
    let distance = 0 //拉动距离
    let isMove = false //是否移动过

    scroll.addEventListener(
      "touchstart",
      e => {
        //滚动条在最顶端 并且当前盒子在顶端的时候 才继续走
        if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;

        let start = e.touches[0].pageY; //手指点击开始
        let move = e => {
          isMove = true
          let current = e.touches[0].pageY;
          distance = current - start; //求出拉动的距离 取正值

          if (distance > 0) {
            if (distance <= 50) {
              //如果distance>=50 那么top值就是50
              scroll.style.top = distance + top + "px";
            } else {
              distance = 50;
              scroll.style.top = top + 50 + "px";
            }
          } else {
            //如果不在考虑范围能移除移动事件
            scroll.removeEventListener("touchmove", move);
            scroll.removeEventListener("touchend", end);
          }
        };
        let end = e => {
          if(!isMove) return
             isMove = false
          this.timer1 = setInterval(() => {
            //一共distance 每次减1
            if (distance <= 0) {
              clearInterval(this.timer1);
              distance = 0;
              scroll.style.top = 40 + "px";
              scroll.removeEventListener("touchmove", move);
              scroll.removeEventListener("touchend", end);
              this.books = [] //先清空原来的数据
              this.offset = 0
              this.getBook();
              return;
            }
            distance -= 1;
            scroll.style.top = top + distance + "px";
          }, 1);
        };

        scroll.addEventListener("touchmove", move);
        scroll.addEventListener("touchend", end);
      },
      false
    );
  },
  created() {
    this.getBook();
    this.loadMore();
  },
  methods: {
    loadMore() {
      clearTimeout(this.timer); //防抖
      this.timer = setTimeout(() => {
        //触发scroll事件 可能触发n次  先进来开一个定时器 下次触发时将上一次的清除掉
        //卷去高度 当前可见高度 总高度
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.scroll;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          this.getBook(); //获取更多
        }
      }, 13);
    },
    more() {
      this.getBook();
    },
    async add(id){
      await addShop(id)
       this.$router.push('/collect') 
    },
    async remove(id) {
      await removeBook(id); //删除某一项
      //后台删除先对应的前台也要删除
      this.books = this.books.filter(item => item.bookId !== id);
    },
    async getBook() {
      //获取分页图书

      if (this.hasMore && !this.isLoading) {
        this.isLoading = true;
        let { hasMore, books } = await pagination(this.offset);
        this.books = [...this.books, ...books];
        this.hasMore = hasMore;
        this.isLoading = false;
        this.offset = this.books.length; //维护偏移量 总书的长度
      }
    }
  },
  computed: {},
  components: {
    MHeader
  }
};
</script>

<style scoped lang="less">
.imgsize{
  width: 150px;
  height:150px;
}
.container {
  ul {
    li {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid rgb(228, 225, 225);
      img {
        width: 150px;
        height: 150px;
      }
      div {
        h4 {
          font-size: 16px;
          line-height: 30px;
          color: rgb(71, 70, 70);
        }
        p {
          padding: 3px 0;
          button {
            width: 45px;
            height: 25px;
            line-height: 26px;
            border: none;
            background: rgb(243, 131, 3);
            border-radius: 5px;
            color: #fff;
            letter-spacing: 2px;
          }
        }
        .bookPrice {
          span {
            margin-left: 20px;
            color: red;
          }
        }
        .bookInfo {
          color: rgb(110, 110, 110);
        }
      }
    }
  }
}
</style>