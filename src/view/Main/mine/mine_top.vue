<template>
    <div class="box">
        <div class="header">
            <span class="iconfont icon-xiaoxi"></span>
            <span>我的717商城</span>
            <span></span>
        </div>
        <dl>
            <dt><img src="../../../static/img/mine/tou.png" alt=""></dt>
            <dd>路飞</dd>
        </dl>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.box{
    height: 268/75rem;
    background:url('../../../static/img/mine/bg.png') no-repeat;
    background-size: cover;
    .header{
        border: none;
        color: #fff;
    }
    .bottom{
        border-bottom:1px solid #ccc;
    }
    dl{
        text-align: center;
        color: #fff;
        dt{
            img{
                width: 120/75rem;
                height: 120/75rem;
            }
        }
    }
}
</style>

