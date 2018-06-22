// import Vue from 'vue'
// import axios from 'axios'
// // console.log(process.env.NODE_ENV)//process是webpack注入到js里的变量

// // const testUrl='http://localhost:3000'
// // const onlineUrl='http:m.jd.com'

// let instance = axios.create({
//     timeout: 3000,
//     header: {
//         // 'Accept-Content':"application/json"
//     }
//     // baseURL:process.env.NODE_ENV==='development'?testUrl:onlineUrl
// })

// instance.interceptors.request.use((config) => {
//     return config
// }, (err) => {
//     console.log('err')
// })

// instance.interceptors.response.use((response) => {
//     if (response.status === 200) {
//         return response.data;
//     } else {
//         return Promise.reject(response)
//     }
// }, (err) => {
//     return 'Err'
// })

// let httpPlugin = {
//     install(Vue) {
//         Object.defineProperty(Vue.prototype, '$http', {
//             value: instance
//         })
//     }
// }
// export default httpPlugin
import axios from 'axios'
let httpInstance = axios.create({
    baseURL: 'http://localhost:3000'
});
httpInstance.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})
httpInstance.interceptors.response.use((response) => {
    if (response.status == 200) {
        return response.data
    } else {
        return response;
    }
})

export { httpInstance }
export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', {
            value: httpInstance
        })
    }
}