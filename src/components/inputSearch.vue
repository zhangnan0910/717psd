<template>
    <input type="text" placeholder="请输入您要购买的商品" @click="JumpSearch">
</template>
<script>
export default {
    props:['data'],
    methods:{
        // 点击搜索框跳入搜索路由
        JumpSearch(){
            
            this.$router.push({
                name:'search',
                params:{
                    data:this.data
                }
            })
        }
    },
}
</script>

