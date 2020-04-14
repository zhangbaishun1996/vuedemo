<template>
        <div>
        <Counter></Counter>
    </div>
</template>
<script>
import Counter from './component/Counter.vue'
export default {
    name:'App',
    data(){
      return {
          msg :'hello'
      }
    },
    components: {
        Counter
    }
}
</script>
<style>

</style>
