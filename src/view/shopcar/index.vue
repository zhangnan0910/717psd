<template>
    <div class="main1">
        <Header>
            <span @click='goto'>&lt;</span>
            <span>购物车</span>
            <span @click="Edit">{{edit}}</span>
        </Header>
        <div class="box" v-show='shopcarList.length<1'>
            <img src="../../../static/img/cart/pic1.png" alt=""><br/>
            <button @click="addcart">去逛逛</button>
        </div>
        <ul ref='ul' class="main">
            
            <li v-for='item in shopcarList' >
                <!-- <h1>店铺名称</h1> -->
                <GoodItem :item='item'></GoodItem>
                
            </li>
        </ul>
        <div class="footer">
            <span>
                <i :class="flag?'iconfont icon-checked':'iconfont icon-check'" @click="checked"></i>
                全选
            </span>
            <p>
                合计 ：{{num}}
            <button>{{btn}}</button></p>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
import GoodItem from './goodItem'
import { getCookie } from "@/utits/cookies";
import { mapState } from 'vuex';
import bus from '@/utits/bus'
export default {
    data(){
        return{
           num:0,
           pricesSum:{},
           flag:false,
           edit:'编辑',
           btn:'结算'
        }
    },
    
    created(){
        this.$store.dispatch('feachCart')
    },
    computed:{
        ...mapState(['shopcarList'])
    },
    mounted(){
        if(!getCookie('token')){
            this.$router.push({
                name:'login'
            })
            return
        }
        bus.$on('update',(res)=>{
            this.pricesSum[res.name] = res.price
            // this.pricesSum.flag = res.off
            this.nums()
        })

       
    },
    methods:{
        addcart(){
            this.$router.push({
                name:'index'
            })
        },
        goto(){
            this.$router.history.go(-1)
        },
        // 计算总价
        nums(){
            this.num = Object.values(this.pricesSum).reduce((init,cur)=>{
                        return init+cur
                    },0)
        },
        // 全选
        checked(e){
            this.flag = !this.flag
            bus.$emit('check',this.flag)
        },
        Edit(){
            this.edit = '完成',
            this.btn = '删除'
            bus.$emit('delete')
        }
    },
    components:{
        Header,
        GoodItem
    }
}
</script>
<style lang="less" scoped>
.footer{
    justify-content: space-between;
    padding-left: 20/75rem;
    p{
        height: 100%;
        button{
            height: 100%;
            padding: 0 60/75rem;
            background: red;
            color: #fff;
            border: none;
        }
    }
    span{
        height: 100%;
        line-height: 90/75rem;
        i.iconfont{
            position: relative;
            top:6/75rem;
        }
    }
}
.box{
    flex:1;
    text-align: center;
    img{
        width: 200/75rem;
        height: 230/75rem;
        margin:100/75rem 0;
    }
    button{
        border: none;
        outline: none;
        border: 1px solid red;
        background: #fff;
        width: 30%;
        color: red;
        border-radius: 20/75rem;
        height: 70/75rem;
        
    }
}
ul{
    flex: 1;
    overflow-y: auto;
    background: #eee;
    li{
        background: #fff;
        margin-bottom: 30/75rem;
        h1{
            padding: 20/75rem;
        }
        
    }
}
</style>

