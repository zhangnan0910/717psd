<template>
    
    <dl>
        <dt>
            <img :src="item.imageurl" alt="">
        </dt>
        <dd>
            <h1>{{item.wname}}</h1>
            <p>
                <span>{{item.jdPrice}}</span>
                <i class="iconfont" @click.stop="addcart(item)">购物车</i>
            </p>
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
            })
        }
    }
}
</script>

