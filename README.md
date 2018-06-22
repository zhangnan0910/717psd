# 717psd

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
# 项目总结

### 1. 简易脚手架
```
vue init webpack-simple name
```

### 2. 经验
```
获取组件里元素
this.$refs.name.$el

上拉刷新公式
子元素总高度 - 滚动条距顶部距离 - 可视区高度

内容不被挤压 在不想被挤压的元素上添加(flex-shirk)

购物车都走后台接口
```

## 3. 需改善
```
懒加载
下拉刷新改变内容(多次请求数据) --> 无加载更多数据
vuelidate表单验证
分类请求数据

```
###### 合并对象
```
父：
    1. data定义空对象 priceSum
    2. 触发事件进行合并对象
        bus.$on('update',(res)=>{
            // let num = Object.values(res).reduce((init,cur)=>{
            //             console.log(cur)
            //             return init+cur
            //         })
        

            this.pricesSum[res.name] = res.price
        })
```
## 4.加密
```
    1. 下载jsonwebtoken
    2. 加密jwt.sign(payload,'密钥',callback)
    3. 解密jwt.verify(payload, '密钥, (err, decoded))
```

## 5.cookie

## 6.坑

##### 避免重复
```
// 判断用户已存在push添加数据
if (cart[decoded.username]) {
    // 定义flag
    let flag = true
    cart[decoded.username].map(item=>{
        // 当数据存在时改变把flag改为false
        if (item.wname === req.body.data.wname){
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
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
