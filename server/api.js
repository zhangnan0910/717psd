const fs = require('fs')
const path = require('path')

// 定义接口
module.exports = function(app){
    const listPath = path.resolve(__dirname+'/list')
    // 首页商品列表接口
    app.get('/index/recommend.action', (req, res) => {
        if(req.query.page>5){
            res.json({
                code:1000,
                msg:'没有更多数据'
            })
        }else{
            let lists = fs.readFileSync(listPath + `/list${req.query.page}.json`, 'utf-8')
            setTimeout(() => {
                // 建议end返回（原因:直接返回对象）
                res.end(lists)
            }, 1000)
        }  
    })
    const queryApi = require('./queryAPI')
    
    // 分类接口
    app.get("/api/classfly",(req,res)=>{
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data=>{
            res.json(data)
        })
    })
    // 登录接口
    app.post('/user/login',(req,res)=>{
        
    })
}