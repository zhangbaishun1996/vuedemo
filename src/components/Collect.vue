<template>
    <div>
      <MHeader>购物车</MHeader>
      <div class="content">
         <Loading v-if="Loading"></Loading>
         <ul class="book-data">
                <li class="check-box" >
                <input type="checkbox" v-model="checkAll" name="checkbox"><span>全选</span>
                </li>
                <li v-for="(book,index) in books" :key="index">
                    <input type="checkbox" name="checkbox" v-model="book.isSelec">
                    <div><img :src="book.bookCover" alt=""></div>
                    <div class="book-con">
                        <span>
                            {{book.bookName}}
                        </span>
                        <span style="color:red;">
                            {{
                                book.bookPrice+'￥'
                            }}
                        </span>
                    </div>
                    <div class="book-btn">
                        <button @click="min(book)">-</button>
                        <input type="number" v-model.number.lazy="book.bookcount" min="1">
                        <button @click="add(book)">+</button>
                    </div>
                    <div class="delete">
                        <button @click="remove(book)">删除</button>
                    </div>
                </li>
                <li></li>
                <li class="price-all">总价：{{sun}}</li>
            </ul>
     </div>
    </div>
</template>
<script>
import MHeader from "../base/MHeader";
import Loading from "../base/Loading";
import { showBook } from "../api/index.js";
export default {
  data() {
    return {
      books: [],
      Loading: false
      // checkAll:true
    };
  },
  computed: {
    checkAll: {
      get() {
        //every() 找false 找到false后停止 返回false
        return this.books.every(item => item.isSelec);
      }, //getset this 指向实例
      set(val) {
        //当我们给checkbox赋值的时候
        this.books.forEach(item => (item.isSelec = val));
      }
    },
    sun() {
      //如果计算属性写成函数默认调用的就是get方法
      return this.books.reduce((prev, next) => {
        if (!next.isSelec) return prev; //如果当前项没被选中则不加
        return prev + next.bookPrice * next.bookcount;
      }, 0);
    }
  },
  created() {
    this.getShop();
  },
  methods: {
    add(a) {
      a.bookcount++;
    },
    min(b) {
      if (b.bookcount == 0) {
        return;
      }
      b.bookcount--;
    },
    async getShop() {
      this.books = await showBook();
      console.log( this.books)
    },
    remove(p) {
      this.books = this.books.filter(item => item !== p);
    }
  },
  components: {
    MHeader,
    Loading
  }
};
</script>

<style scoped lang="less">
input[name="checkbox"] {
  -webkit-appearance: checkbox;
}
.check-box {
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.book-data {
  padding: 0 10px;
}
.book-data img {
  width: 100px;
  height: 100px;
}
ul li {
  padding-top: 10px;
  display: flex;
  align-items: center;
}
.book-con {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.book-btn {
  padding: 0 10px;
  button,
  input {
    width: 25px;
    text-align: center;
  }
}
.delete {
  text-align: center;
}
.price-all {
  justify-content: flex-end;
}
</style>