import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
import { getCookie } from '@/utits/cookies'
import { httpInstance } from '@/utits/http'
import { parse } from 'querystring';
const store = new Vuex.Store({
    state:{
        Homeicon:[],
        Homelist:[],
        shopcarList:[]
    },
    mutations:{
        // 首页iconlink
        fetchHomeicon(state, payload){
            state.Homeicon = payload
        },
        // 首页listItem
        fetchHomelist(state, payload) {
            state.Homelist = payload
        },
        // 购物车列表
        feachCart(state,payload){
            state.shopcarList = payload
        },
        
    },
    getters:{},
    actions:{
        // 获取购物车信息
        feachCart({commit}){
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
                count: payload.similarEnter>=10?10: payload.similarEnter++
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
                count: payload.similarEnter<1?1:payload.similarEnter--
            }).then(res => {
                if (res.code == 1) {
                    // commit('feachmuise')
                }
            })
        },
        getHomeicon({ commit, state }, payload) {

            fetch('/server/data.json').then(res => res.json()).then(res => {
                commit('fetchHomeicon', res.iconClassfly)
            })
        },
        getHomelist({commit,state},payload){

            fetch('http://localhost:3000/index/recommend.action?page='+payload)
                .then(res=>res.json())
                .then(res=>{
                    commit('fetchHomelist', JSON.parse(res.recommend).wareInfoList)
            })
        },
        getUpdate({commit,state},payload){
         
            fetch('http://localhost:3000/index/recommend.action?page='+payload.page)
                    .then(res=>res.json())
                    .then(res=>{
                     
                        if(res.code===1000){
                            //this.msg = '没有更多数据'
                        }else{
                            
                            //对数据更新
                            state.Homelist = [
                                ...state.Homelist,
                                ...JSON.parse(res.recommend).wareInfoList
                            ]
                        }
                })
        }
    }
})
export default store