import Vue from 'vue'
import VueRouter from 'vue-router'
// 首页
import  Home  from '../view/Main/home'
// 登录页
import Login from '../view/login'
// 搜索页
import Search from '../view/search'
// 购物车
import Shopcar from '../view/shopcar'
// 注册
import Registered  from '../view/registered/registered'
// 二级路由 
// 首页
import Index from '../view/Main/home/home'
// 我的页面
import Mine from '../view/Main/mine'
// 分类
import Classfly from "../view/Main/classfly";
// 详情页
import Detail from '../view/detail'
// 我的订单
import Mine_order from '../view/mine_order/index'
// 我的订单
import All from "../view/mine_order/all";
import Daifukuan from '../view/mine_order/daifukuan'
import Daifahuo from '../view/mine_order/daifuhuo'

import Daishouhuo from '../view/mine_order/daishouhuo'
Vue.use(VueRouter)

import {getCookie} from '../utits/cookies'
const router = new VueRouter({
    mode:'history',
    routes:[
            {
                path: "/",
                redirect:'/home/index'
            },
            {
                path:"/home",
                name:"home",
                component:Home,
                children:[
                    {
                        path: "index",
                        name: "index",
                        component: Index,
                    },
                    {
                        path: "classfly",
                        name: "classfly",
                        component: Classfly
                    }, 
                    {
                        path: "mine",
                        name: "mine",
                        component: Mine
                    }
                ]
            },
            {
                path:"/login",
                name:"login",
                component:Login
            },
            {
                path: "/search",
                name: "search",
                component: Search
            },
            {
                path: "/shopcar",
                name: "shopcar",
                component: Shopcar
            },
            {
                path: "/detail",
                name: "detail",
                component: Detail
            },{
                path:'/registered',
                name:'registered',
                component: Registered
            },{
                path:'/mine_order',
                name:'mine_order',
                component: Mine_order,
                children:[
                    {
                        path:'all',
                        name:'all',
                        component:All
                    },
                    {
                        path:'daifukuan',
                        name:'daifukuan',
                        component: Daifukuan
                    }, {
                        path: 'daifahuo',
                        name: 'daifahuo',
                        component: Daifahuo
                    }, {
                        path: 'daishouhuo',
                        name: 'daishouhuo',
                        component: Daishouhuo
                    }, {
                        path: 'all',
                        name: 'all',
                        component: All
                    }
                ]
            }
            
            
        ]  
    })
router.beforeEach((to,from,next) => {
    if(to.name=='shopcar' || to.name=='mine'){
        let token = getCookie('token')
        if(!token){
            next({name:'login',query:{from:to.name}})
        }else{
            next()
        }
    }else{
        next()
    }
    
})
export default router 
