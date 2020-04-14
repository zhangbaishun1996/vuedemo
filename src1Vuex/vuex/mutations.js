
//导入方mutations修改状态名称
import * as Types from './mutations-type'
const mutations = {
    [Types.add](state, count) { //state是自动放入的 默认指的是当前的state
      state.count += count;
    },
    [Types.minus](state) {
      state.count -= 1;
  
    }
  }
  export default mutations
  