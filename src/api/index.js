import axios from 'axios'
//设置默认的基本路径 当路径为http://localhost:3000可以不用写
axios.defaults.baseURL = 'http://localhost:3000'


//拦截器
axios.interceptors.response.use((res)=>{
    return res.data //统一拦截结果 把结果处理成res.data
})

//获取轮播图路径 返回的是一个promise
export let getSliders = () => axios.get('/sliders')

//获取热门接口数据 
export let getHots = () => axios.get('/hot')


//获取全部图书
export let getBooks = () => axios.get('/book')

//删除某一本图书
export let removeBook = (id) => axios.delete(`/book?id=${id}`)  

//获取某一本图书
export let oneBook = (id) => axios.get(`/book?id=${id}`)

/* 修改图书
    @param id编号   
    @data 数据 请求体发送
    @returns {axios promise}
*/
export  let updataBook = (id,data) =>{
    return axios.put(`/book?id=${id}`,data)
}

//增加一本图书
export let addBook = (data) =>{
    return axios.post('/book',data)
}

//加入购物车
export let addShop = (id) =>{
    return axios.post(`/add?id=${id}`)
}

//读取购物车信息
export let showBook = () =>axios.get('/getShopBook')

//接口整合  axios.all([obj,obj1]) all里面的方法都完成了才会调用
export let getAll = ()=>{
    return axios.all([getSliders(),getHots()])
}


//加载更多 根据 offset的偏移量来加载数据 5 5-10 10-15
export let pagination = (offset)=>{
    return axios.get(`/page?offset=${offset}`)
}