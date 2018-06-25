<template>
    <div>
        <Header>
            <span class="iconfont icon-left" @click="link_mine"></span>
            <span>我的订单</span>
            <span></span>
        </Header>
        <ul class="nav">
            <router-link tag='li' to='/mine_order/all'>全部</router-link>
            <router-link tag='li' to='/mine_order/daifukuan'>代付款</router-link>
            <router-link tag='li' to='/mine_order/daifahuo'>待发货</router-link>
            <router-link tag='li' to='/mine_order/daishouhuo'>待收货</router-link>
            <router-link tag='li' to='/mine_order/shouhou'>售后</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
    components:{
        Header
    },
    mounted() {
        console.log(this.$router)
    },
    methods:{
        link_mine(){
            this.$router.push({
                name:'mine'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.nav{
    display: flex;
    height: 90/75rem;
    border-bottom: 1px solid #ccc;
    line-height: 90/75rem;
    li{
        flex: 1;
        text-align: center;
    }
    li.active{
        border-bottom: 2px solid red;
        color: red;
    }
}
</style>
