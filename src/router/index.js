import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

// import Home from '../components/Home.vue'
// import List from '../components/List.vue'
// import Add from '../components/Add.vue'
// import Collect from '../components/Collect.vue'
// import Detial from '../components/Detial.vue'

export default new Router({
  //this.$router 去路由上的属性
  routes: [{
      path: '/',
      redirect: '/home',
    },

    {
      path: '/home',
      component: () =>
        import ('../components/Home.vue'), //路径为当前路径是 调用()=> import('../components/Home.vue')函数
      meta: { //存放备注信息
        keepAlive: true, // 是否需要缓存//this.$router.meta.keepAlive 
        title:'首页',
      }
    },
    {
      path: '/collect',
      component: () =>
        import ('../components/Collect.vue'), //代码分割
        meta:{
          title:'购物车',
        }
    },
    {
      path: '/add',
      component: () =>
        import ('../components/Add.vue'),  
        meta:{
          title:'添加',
        }
    },
    {
      ///detial/1 {bid:1} 路径参数 必须有但是可以随机
      path: '/detial/:bid',
      component: () =>
        import ('../components/Detial.vue'),  
      name: 'detial',
      meta:{
        title:'详情',
      }
    },
    {
      path: '/list',
      component: () =>
        import ('../components/List.vue'),
        meta:{
          title:'列表',
        }
    },
		{
		  path: '/listnum',
		  component: () =>
		    import ('../components/listnum.vue'),
		    meta:{
		      title:'列表',
		    }
		},
    {
      path: '*',
      redirect: '/home'
    }

  ]
})
