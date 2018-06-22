import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
import { getCookie } from '@/utits/cookies'
import { httpInstance } from '@/utits/http'
import { parse } from 'querystring';
const store = new Vuex.Store({
    state:{
        homeData:{
            
        },
        shopcarList:[]
    },
    mutations:{
        feachCart(state,payload){
            state.shopcarList = payload
        },
        
        // getHome(state,payload){
        //     console.log(payload)
        //     state.homeData = payload
        // }
    },
    getters:{},
    actions:{
        // 获取购物车信息
        feachCart({commit},payload){
            httpInstance.post('/api/shopcar', {
                token: getCookie('token')
            }).then(res => {
                if (res.code == 1) {
                    if (res.data){
                        commit('feachCart', res.data)
                    } else {
                        commit('feachCart', [])
                    }
                    
                } 
            })
        },

        // cart++
        feachAdd({commit,dispatch},payload){
    
            httpInstance.post('/api/add',{
                token: getCookie('token'),
                data: payload.wname,
                count: payload.similarEnter++
            }).then(res=>{
                if(res.code==1){
                    // commit('feachAdd')
                }
            })
        },
        // cart--
 
        feachmuise({ commit, dispatch }, payload) {
     
            httpInstance.post('/api/minus', {
                token: getCookie('token'),
                data: payload.wname,
                count: payload.similarEnter--
            }).then(res => {
    
                if (res.code == 1) {
                    // commit('feachmuise')
                }
            })
        },
        // getHome({commit},payload){

        //     fetch('/server/data.json').then(res=>res.json()).then(res=>{
        //         let iconClassfly = res.iconClassfly
        //         commit('getHome',iconClassfly)
        //     })
        //     fetch('http://localhost:3000/index/recommend.action?page='+payload)
        //         .then(res=>res.json())
        //         .then(res=>{
        //             let homeList = JSON.parse(res.recommend).wareInfoList
        //             commit('getHome', homeList)
        //     })
            
        // }
    }
})
export default store