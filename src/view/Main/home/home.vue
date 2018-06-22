<template>
    <div class="main">
         <Header >
            <img src="@/static/img/home/search/logo.png"/>
            <Seartch :data="listItem"/>
            <div>
                <a href="#">
                    <i class="iconfont icon-shopcar"></i>
                    <span>我的店铺</span>
                </a>
                <a href="#">
                    <i class="iconfont icon-xiaoxi"></i>
                    <span>消息</span>
                </a>
            </div>
         </Header>
         <div class="main" ref='box' @scroll="onScrollFn">  
         
            <!-- 轮播图 -->
            <Swipers ref='swiper'/>
            <!-- 天猫首页分类 -->
            <Home_iconClassfly :data="iconClassfly" ref='iconfly'/>
            <!-- 首页列表 -->
       
            <ul class="box_item" ref='list' data-attr="">
                <li v-for="item in listItem" @click="gotoDetail(item)">
                    <Home_listItem :item="item" />
                </li>
            </ul>
            <p ref='msg'>{{msg}}</p>
        </div>
    </div>
</template>
<script>
// 请求axios
import axios from 'axios'
// 引入自定义jsonp
import jsonp from '@/utits/jsonp'
// 轮播组件
import Swipers from '@/components/swiper'
// 列表组件
import Home_listItem from '@/components/home/listItem'
// 天猫首页分类
import Home_iconClassfly from '@/components/home/iconClassfly'
// 头部组件
import Header from '../../../components/Header'
// 搜索组件
import Seartch from "@/components/inputSearch"
import {mapState} from 'vuex'
export default {
    data(){
        return {
            //url:'http://list.meilishuo.com/search?frame=1&page=1&cKey=wap-index&tag=&maxPrice=&minPrice=&fcid=&_mgjuuid=e61a3677-d308-472e-a1be-b5f71dee0444&sort=pop&_=1528851893936&callback=jsonp4',
            //jsonpName:'jsonp4',
            iconClassfly:[],
            footers:[],
            listItem:[],
            page:1,
            on_off:true,
            msg:'加载更多数据...'
        }
    },
    created(){
       // this.$store.dispatch('getHome',this.page)
     // 请求本地数据
        fetch('/server/data.json').then(res=>res.json()).then(res=>{
            this.iconClassfly = res.iconClassfly
            this.footer = res.footer
        })
        
        // 本地模拟跨域请求(初始数据请求)
        fetch('http://localhost:3000/index/recommend.action?page='+this.page)
            .then(res=>res.json())
            .then(res=>{
               this.listItem = JSON.parse(res.recommend).wareInfoList
        })
        
        // 跨域请求数据
        // jsonp(this.url,this.jsonpName).then(res=>{
        //     console.log(res)
        // })
    },
    computed:{
        ...mapState(['homeData']),
      
        // getData:function(){
        //     console.log(this.homeData.listItem)
        // }
    },

    methods:{
        
        gotoDetail(item){
            this.$router.push({
                name:'detail',
                params:{
                    data:item
                }
            })
        },
        // 滚动触发下拉刷新
        onScrollFn(e){
            
            // 获取可视高度
            let boxH = this.$refs.box.offsetHeight;
            // 获取swiper高度
            let swiperH = this.$refs.swiper.$el.offsetHeight;
            // 获取首页分类
            let iconflyH = this.$refs.iconfly.$el.offsetHeight;
            // 获取列表高度
            let listsH = this.$refs.list.offsetHeight;
            // 获取滚动距离
            let scrollWt = this.$refs.box.scrollTop;
         
           // 子元素总高度 - listsH + swiperH + iconflyH - boxH
           if(listsH + swiperH + iconflyH - boxH - scrollWt < 50 && this.on_off){
               if(this.page<=5){
                   this.page++
               }else{
                   return this.page = 5
               }
               // 避免重复请求数据
               this.on_off = false
               this.$refs.list.setAttribute('data-attr','加载更多')
                fetch('http://localhost:3000/index/recommend.action?page='+this.page)
                    .then(res=>res.json())
                    .then(res=>{
                        if(res.code===1000){
                            this.msg = '没有更多数据'
                        }else{
                            //对数据更新
                            this.listItem = [
                                ...this.listItem,
                                ...JSON.parse(res.recommend).wareInfoList
                            ]
                        }
                })
                this.on_off = true
           }
         
        }
    },
    components:{
        Swipers,
        Header,
        Seartch,
        Home_listItem,
        Home_iconClassfly
    }
}
</script>

