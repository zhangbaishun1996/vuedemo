import Vue from 'vue'
import App from './App.vue'
import store from './vuex/index'

new Vue({
  el: '#app',
  ...App,
  store //store被注册到实例上 所有组件都会有一个this.$store属性
})
