//vuex  平级组件交互，找共同的父亲解决，跨组件交互 eventBus混乱（发布订阅）
//组件不要轻易改vue里面的状态
//vuex借鉴了 fluxredux vuex只能在vue中使用（单独为vue开发的）
//vuex 为大型项目，主要是状态管理 将数据统一管理
import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'

import mutations from './mutations.js'
import getters from './getters.js'
//插件都需要Vue.use()
Vue.use(Vuex)
const state = {
  count: 0 //声明一个状态
}

//创建一个vuex容器
export default new Vuex.Store({
  state, //将状态放入容器中
  mutations, //修改state状态
  getters, //计算状态值
  plugins: [logger()], //日志插件
  strict: true // 严格模式 只能通过mutation 来更改vuex中的状态mutation 不支持异步
})
