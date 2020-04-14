let http = require('http')
let fs = require('fs')
let url = require('url')

//通用方法
//解决异步问题  读取所有书籍
function read(cb){
    fs.readFile('./book.json','utf-8',function(err,data){
        if(err||data.length==0){
            cb([])
        }else{
            cb(JSON.parse(data))
        }
    })
}
function readShop(cb){
    fs.readFile('./shop.json','utf-8',function(err,data){
        if(err||data.length==0){
            cb([])
        }else{
            cb(JSON.parse(data))
        }
    })
}
//  read(function(books){
//      console.log(books)
//  })

function write(url='./book.json',data,cb){
    fs.writeFile(url,JSON.stringify(data),cb)
}

let pageSize = 5;//每页显示五个
//write({},function(){}) 
//获取轮播图/sliders
let sliders = require('./sliders.js')

http.createServer((req,res)=>{
    //解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") return res.end();//让options请求快速返回

let {pathname,query} = url.parse(req.url,true) //true 保证query是一个对象


//下拉刷新
if(pathname === '/page'){
    let offset = parseInt(query.offset) || 0

    read(function(books){
        //每次的偏移量 在偏移的基础上增加五条
      let result = books.reverse().slice(offset,offset+pageSize) //数据倒叙
        let hasMore = true //默认有更多
        if(books.length<=offset+pageSize){
            //已经显示的数目 大于总数
            hasMore = false
        }
        res.end(JSON.stringify({hasMore,books:result}))
    })
    return 
}
// 轮播图
if(pathname === '/sliders'){
    res.setHeader('Content-type','application/json','charset=utf8')
    return res.end(JSON.stringify(sliders))
}

//热门图书
if(pathname === '/hot'){    
    read(function(books){ //books代表所有图书
          let hot=books.reverse().slice(0,6) //先将数组倒叙，然后在截取六个
          res.setHeader('Content-type','application/json','charset=utf8')
          setTimeout(()=>{
            res.end(JSON.stringify(hot))
          },1000)
         
    })
    return 
}
//加入购物车
if(pathname === '/add'){
    let id = parseInt(query.id)  //这里的id是字符串需要转化
    read(function(books){
        let arr=[]
        let book = books.find(item =>item.bookId === id)
        if(!book) book = {} 
        book.isSelec = true
        book.bookcount = 1
        arr.push(book)
        write('./shop.json',arr,function(){
            res.setHeader('Content-type','application/json','charset=utf8')
            res.end(JSON.stringify(book))
        })
     })
     return 
}
//读取购物车内容
if(pathname === '/getShopBook'){
    readShop(function(books){
        res.setHeader('Content-type','application/json','charset=utf8')
        res.end(JSON.stringify(books))
    })
    return 
}
//列表页书 对书的增删改查
if(pathname === '/book'){
    let id = parseInt(query.id)  //这里的id是字符串需要转化
    switch(req.method){
        case 'GET':
        if(id){//查询一个
            read(function(books){
               let book = books.find(item =>item.bookId === id)
               
               if(!book) book = {} 

                res.setHeader('Content-type','application/json','charset=utf8')
                res.end(JSON.stringify(book))
            })  
        }else{//读取所有书籍
            read(function(books){
                res.setHeader('Content-type','application/json','charset=utf8')
                res.end(JSON.stringify(books.reverse()))
            })
        }
        break;
        case 'POST':
        let str = ''
        req.on('data',chunk => {
            str+=chunk
        })
        req.on('end',()=>{
            let book = JSON.parse(str)
            read(function(books){
                book.bookId = books.length?books.length + 1:1
                books.push(book) //将数据放入books中 books在内存中
                write(books,function(){
                    res.end(JSON.stringify(book))
                })
            })
        })
        break;
        case 'PUT':
        if(id){ //获取当前需要修改的id
            let str = ''
            req.on('data',chunk => {
                str += chunk
            })
            req.on('end',()=>{
                let book = JSON.parse(str) //book要改成的样子
                read(function(books){
                    books = books.map(item=>{
                        if(item.bookId === id){ //找到id相同的那一本
                            return book 
                        }
                        return item //其他书正常返回
                    })  
                    write(books,function(){//将数据写回json
                        res.end(JSON.stringify(book))
                    })
                })
            })
            
        }
        break;
        case 'DELETE':
        read(function(books){
            books = books.filter(item =>item.bookId !== id)
            // console.log(books.length)
            write(books,()=>{
                res.end(JSON.stringify({}))//删除返回空对象
            })
        })
        break;
    }
    return
}
//读取静态文件 ,
fs.stat('.'+pathname,function(err,stats){
        if(err){ //如果路径找不到 返回首页 不建议这么做 
            fs.createReadStream('index.html').pipe(res); //读取一个文件流
        }else{
                //如果读取的是目录会报错
               
                if(stats.isDirectory()){
                   let p =  require('path').join('.'+ pathname,'./index.html')
                   fs.createReadStream(p).pipe(res);
                //    res.setHeader('Content-type','application/json','charset=utf8')
                }else{
                    // res.setHeader('Content-type','application/json','charset=utf8')
                    fs.createReadStream('.'+ pathname).pipe(res); //读取一个文件流
                }
              
        }

})



}).listen(3000,function(){
    console.log('ok')
})