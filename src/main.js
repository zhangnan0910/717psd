import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store/index'
import http from './utits/http'
Vue.prototype.axios = axios

Vue.use(http)
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

