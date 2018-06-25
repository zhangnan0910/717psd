<template>
    
    <dl>
        <dt>
            <img v-lazy="item.imageurl" alt="">
        </dt>
        <dd>
            <h1>{{item.wname}}</h1>
            <p>
                <span>{{item.jdPrice}}</span>
                <i class="iconfont icon-shopcar" @click.stop="addcart(item)"></i>
            </p>
            <DialogTips ref='Tips'></DialogTips>
        </dd>
    </dl> 
   
</template>
<script>
import {getCookie}  from '@/utits/cookies'                      
export default {
    props:["item"],
    methods:{
        addcart(item){
            this.$http.post('/api/addcart',{
                token:getCookie('token'),
                data:item
            }).then(res=>{
                console.log(res)
                if(res.code==1001){
                    // console.log(this.$refs.Tips.active)
                    this.$refs.Tips.active('请登录购物车')
                    // this.$router.push({
                    //     name:'login'
                    // })
                }else{
                    this.$refs.Tips.active('添加成功')
                }
            })
        }
    }
}
</script>

