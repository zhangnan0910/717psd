import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import http from './utits/http'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: './static/error.png',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529858398269&di=e79be2ad65518116a4d915705329c76d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014c8d554441400000019ae9de6b6a.jpg'
})
// 引用自定义dialogtips
import Dialog from './plugins/dialogTips'
Vue.use(http)
Vue.use(Dialog,{
  timeout:2000
})
import 'swiper/dist/css/swiper.css'
import './common/font/iconfont.css'
import './common/css/style.css'
import './router/index'

new Vue({
  el: '#app',
  render: h => h(App),
  router, 
  store
})

