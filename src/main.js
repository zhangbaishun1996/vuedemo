// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper' //导入swiper
import VueLazyload from 'vue-lazyload' //图片懒加载
import 'swiper/dist/css/swiper.css' //引入样式
Vue.use(VueAwesomeSwiper) //将该插件执行
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png', //错误图
  loading: 'http://img2.shangxueba.com/img/fevte/20140813/9/D286937CC746C9B7FF51F56E6E94EC86.jpg', //加载中图片
  attempt: 1
})

//在进入路由之前每一次都会执行此方法 全局钩子 也有拦截功能
router.beforeEach((to, from, next) => {
  // console.log(to)
  //编写公有逻辑
  document.title = to.meta.title;
  next()
})



/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
