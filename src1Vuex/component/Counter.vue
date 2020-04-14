<template>
    <div>
        <br>
        计数器：<button @click="minus">-</button>  
        <br>
         当前：{{$store.state.count}}<br> 
         计数器：<button @click="add">+</button>  
         {{$store.getters.val}}
    </div>
</template>
<script>
import * as Types from '../vuex/mutations-type'
export default {
  data() {
    return {};
  },
  created () {
    //   console.log(this.$store)
  },
  methods: {
      add(){
          //第二个参数是载荷
          this.$store.commit(Types.add,2) //会去找mutations中定义的add方法
      },
      minus(){
          this.$store.commit(Types.minus)
      }
  }
};
</script>
