<template>
  <div id="app">

     <!-- <transition enter-active-class="animated fadeIn" -->
                    <!-- leave-active-class="animated fadeOut"  mode="out-in"> -->
                     <!-- leave-active-class="animated fadeOut" mode="out-in" -->
                     <!-- mode 切换模式  in-out 先进来后出去 -->
                     <!-- 解决抖动延迟同时显示问题 用绝对定位 position -->
                     <!-- keep-alive 要缓存谁就要将谁包住 -->
                     <!-- <keep-alive >
                            <router-view class="posi"></router-view>
                     </keep-alive>
                
        </transition> -->
        <transition name="fadeIn">
        <keep-alive >
                 <!-- v-if="$route.meta.keepAlive" 缓存路由元参数上带有meta属性的值 -->
              <router-view class="" v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
           </transition>  
        <transition name="fadeIn">
          <router-view class="" v-if="!$route.meta.keepAlive"></router-view>
         </transition>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/Tab.vue"; //导入当前路由组件
export default {
  name: "App",
  components: {
    Tab
  }
};
</script>

<style >
/*公共样式区 */

/* 导入清除默认样式*/
@import "../static/css/until.css";

.content,
.posi {
  position: fixed;
  top: 40px;
  width: 100%;
  bottom: 51px;
  left: 0px;
  overflow: auto;
}
#app {
  width: 100vw;
  height: 100vh;
}
/* 组件切换动画*/
.fadeIn-enter {
  opacity: 0;
}
.fadeIn-enter-active {
  transition: all 0.3s linear;
}
.fadeIn-leave-active {
  transition: all 0.3s linear;
  opacity: 0;
}
</style>
