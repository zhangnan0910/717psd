<template>
    <div>
        <dl>
            <dt>
                <img :src="item.imageurl" alt="">
            </dt>
            <dd>
                <h1>{{item.wname}}</h1>
                <p>
                    <span>￥{{item.jdPrice}}</span>
                </p>
            </dd>
        </dl>
        <div class="footer">
            <span>购物车</span>
            <p><button>加入购物车</button>
            <button>立即购买</button></p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            item:this.$route.params.data
        }
    },

}
</script>
<style lang="less" scoped >
div{
    width: 100%;
    height: 100%;
}
    dl{
        width: 100%;
        text-align: center;
    }
    .footer{
        width: 100%;
        height: 98/75rem;
        position: fixed;
        left: 0;
        bottom:0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .footer p{
        height: 100%;
    }
    .footer button{
        display: inline-block;
        background: rgb(221, 12, 12);
        color: #fff;
        border: none;
        padding: 0 30/75rem;
        height: 100%;
    }
</style>

