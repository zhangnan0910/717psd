

 // 实现原理

// 动态创建script
// 利用src
// callback
// callbackName跟后台对接好
// function jsonp(url,callbackName,callback) {
//     window[callbackName] = (data)=>{
//         callback(data)
//     }
//     let script = document.createElement('script');
//     script.src = url 
//     document.body.appendChild(script)
// }
function jsonp(url,callbackName) { 
    return new Promise((resolve,reject)=>{
        window[callbackName] = function(data){
            resolve(data)
        }
        let script = document.createElement('script');
        script.src = url
        document.body.appendChild(script)
    })
    
 }
export default jsonp