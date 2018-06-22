const fs = require('fs')
const path = require('path')
const express = require('express')
let app = express()
// 加密包
let jwt = require('jsonwebtoken')

//const query = require('./queryAPI')

// 处理post请求依赖包
const bodyParser = require("body-parser")
app.use(bodyParser.json())

// 所有的请求都设置跨域
app.all('*', function (req, res, next) {
    res.header({
        // *代表所有域名的都以访问
        'Access-Control-Allow-Origin': '*',
        // 指定某些字段可跨域
        //'Access-Control-All-Origin': 'http://localhost:8080'
        'Access-Control-Allow-Headers':'*'
    })
    next()
})

// 商品数据路径
const listPath = path.resolve(__dirname + '/list')
// 首页商品列表接口
app.get('/index/recommend.action', (req, res) => {
    if (req.query.page > 5) return
    
    let lists = fs.readFileSync(listPath + `/list${req.query.page}.json`, 'utf-8')
    setTimeout(() => {
        // 建议end返回（原因:直接返回对象）
        res.end(lists)
    }, 1000)
    
})

// 获取首页数据

// app.get('/api/classfly',(req,res)=>{
//     query(`index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data=>{
//         //res.end(data)
    
//     })
//     res.json({code:1})
// })

// 登录
// app.post('api/user/login',(req,res)=>{
//     console.log(req.body)
//     res.end('1')
// })

// 注册
app.post('/api/user/registered',(req,res)=>{
    let Sqlpath = path.resolve(__dirname+'/sql');
    // 读文件(转对象，不转会报错)
    let moniFS = JSON.parse(fs.readFileSync(Sqlpath + '/moni.json', 'utf-8'))
    // 当数据存在时返回
    if (moniFS.some(item => {  
        return item.username == req.body.username
    })){
        res.json({
            code: 0,
            msg: '已注册'
        })
        return
    }
    // 不存在push
    moniFS.push(req.body)
    // 修改值后重新显示数据
    fs.writeFile(Sqlpath + '/moni.json', JSON.stringify(moniFS),function(err) {
         res.json({
            code:1,
        })
        return
    })
})

// 登录
app.post('/api/user/login', (req, res) => {
    let Sqlpath = path.resolve(__dirname + '/sql');
    // 读文件(转对象，不转会报错)
    let moniFS = JSON.parse(fs.readFileSync(Sqlpath + '/moni.json', 'utf-8'))
   
    // 加密
    let token = jwt.sign(req.body,'zhangnan',{expiresIn:60*60})
   
    if (moniFS.some(item => {
        return item.username === req.body.username && item.password === req.body.password
    })){
        {
            res.json({
                code: 1,
                msg: 'succsee',
                token
            })
        }
    } else if (moniFS.some(item => {
        // 用户名不匹配时
        return item.username !== req.body.username
    })){
        res.json({
            code: 2
        })
    }else{
        res.json({
            code: 0,
            msg: '账号密码有误'
        })
    }
})

// 添加购物车数据到后台
app.post('/api/addcart',(req,res)=>{
    if(!req.body.token){
        res.json({
            code:1001,
            msg:'请传入token字段'
        })
    }
    jwt.verify(req.body.token, 'zhangnan', (err, decoded) => {
        if (err) {
            res.json({
                code: 0,
                msg: '请求超时 jwt expired'
            })
        } else {

            let cart = JSON.parse(fs.readFileSync(__dirname + "/cart/cartlist.json", 'utf-8'))
            // 判断用户已存在push添加数据
            if (cart[decoded.username]) {
                // 定义flag
                let flag = true
                cart[decoded.username].map(item=>{
                    // 当数据存在时改变把flag改为false
                    if (item.wname === req.body.data.wname){
                        item.similarEnter++
                        flag = false
                    }
                })
                // flag为真时为true
                if(flag){
                    cart[decoded.username].push(req.body.data)
                }
            } else {
                // 判断用户不存在
                cart[decoded.username] = [req.body.data]
            }

            fs.writeFile(__dirname + '/cart/cartlist.json', JSON.stringify(cart), (err) => {
                if (!err) {
                    res.json({
                        code:1
                    })
                }
            })
        }
    })
})


// 购物车
app.post('/api/shopcar',(req,res)=>{
    // 解密
    jwt.verify(req.body.token,'zhangnan',(err,decoded)=>{
     //[decoded.username]
        if(err){
            res.json({
                code:0,
                msg: '请求超时 jwt expired'
            })
        }else{
            let FS = JSON.parse(fs.readFileSync(__dirname + "/cart/cartlist.json", 'utf-8'))
            res.json({
                code: 1,
                msg: '请求成功',
                data: FS[decoded.username]
            })
        }
    })
})
// 操作++
app.post('/api/add', (req, res) => {
    jwt.verify(req.body.token, 'zhangnan', (err, decoded) => {
        if (err) {
            res.json({
                code: 0,
                msg: '请求超时 jwt expired'
            })
        } else {
            let cart = JSON.parse(fs.readFileSync(__dirname + "/cart/cartlist.json", 'utf-8'))

            cart[decoded.username].map(item => {
                // 当数据存在时改变把flag改为false
                if (item.wname === req.body.data) {
                    item.similarEnter = req.body.count
                }
            })
            fs.writeFile(__dirname + '/cart/cartlist.json', JSON.stringify(cart), (err) => {
                if (!err) {
                    res.json({
                        code: 1
                    })
                }
            })
        }
    })
})

// 操作--
app.post('/api/minus', (req, res) => {
    jwt.verify(req.body.token, 'zhangnan', (err, decoded) => {
        if (err) {
            res.json({
                code: 0,
                msg: '请求超时 jwt expired'
            })
        } else {
            let cart = JSON.parse(fs.readFileSync(__dirname + "/cart/cartlist.json", 'utf-8'))

            cart[decoded.username].map(item => {
                // 当数据存在时改变把flag改为false
                if (item.wname === req.body.data) {
                    if (req.body.count<1){
                        res.json({
                            msg:'错误'
                        })
                    }
                    item.similarEnter = req.body.count
                }
            })
            fs.writeFile(__dirname + '/cart/cartlist.json', JSON.stringify(cart), (err) => {
                if (!err) {
                    res.json({
                        code: 1
                    })
                }
            })
        }
    })
})
// 端口号
app.listen('3000',function(){
   console.log(3000)
})

// 引入自定义api模块
//const api = require('./api')