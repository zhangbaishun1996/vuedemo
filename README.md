# 23vue-book

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# 当前下载的vue项目没有less需要手动安装
npm install less less-loader 

#获取数据
npm install axios

#vuex插件
npm install vuex 

# bootstrap

npm install bootstrap

mock 模拟数据

api 所有请求接口

base 基础组件

components页面级组件

vue 优化
## coding split 代码分割
## 在路路由中将组件写成 component: () =>import ('../components/Collect.vue')的格式


##vuex 代码在srcVuex下 如果需要打包改文件 责修改build/base.config.js(  entry: 'app: './src/main.js'},)
## 将src修改成srcVuex

## 根据数据的复用性来区分组件 能复用的数据组件抽离出去 不复用的组件直接写页面里
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
