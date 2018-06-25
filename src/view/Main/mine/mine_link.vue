<template>
    <div>
        <div class="header bottom">
            <span>我的店铺</span>
            <span class="iconfont icon-right"></span>
        </div>
        <div class="wrap">
            <router-link :to="{ path: 'mine_order', query: { id: 'daifukuan' }}">
                <i class="iconfont icon-daifukuan"></i>
                <span>代付款</span>
            </router-link>
            <router-link :to="{ path: 'mine_order', query: { id: 'daifuhuo' }}">
                <i class="iconfont icon-daifahuo"></i>
                <span>代发货</span>
            </router-link>
            <router-link :to="{ path: 'mine_order', query: { id: 'daishouhuo' }}">
                <i class="iconfont icon-daishouhuo"></i>
                <span>代收货</span>
            </router-link>
            <router-link :to="{ path: 'mine_order', query: { id: 'shouhou' }}">
                <i class="iconfont icon-shouhou"></i>
                <span>售后</span>
            </router-link>
            <router-link to="/mine_order">
                <i class="iconfont icon-wodedingdan"></i>
                <span>我的订单</span>
            </router-link>
        </div>
    </div>
</template>
<style lang="less" scoped>
.wrap{
        display:flex;
        border-bottom: 1px solid #ccc;
        a{
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 30/75rem 0;
            span{
                padding-top:10/75rem;
            }
        }
        a:nth-child(5){
            border-left: 1px solid #ccc;
        }
    }
</style>

