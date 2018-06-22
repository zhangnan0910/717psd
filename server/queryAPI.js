let http = require('http')
//https://m.gome.com.cn/index.php?ctl=goods_class&act=ajaxGetClassList&cid=17951828

function queryApi(url ='/index.php?ctl=goods_class&act=ajaxGetClassList&cid=17951828'){
    console.log(url)
    return new Promise((resolve,reject)=>{
        
        const options = {
                hostname:'m.gome.com.cn',
                port:80,
                path: url,
                method:'GET',
                headers:{
                    //'Content-Type':'application/json'
                }
            };

        let data = '';
        const req = http.request(options, (res) => {
            console.log(`状态码: ${res.statusCode}`);
            console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data+=chunk
            });
            res.on('end', () => {
                console.log(data)
                resolve(data)
            });
        });

        req.on('error',(e)=>{
            console.log(`problem with request:${e}`)
        })

    })

}
queryApi()
module.exports = queryApi