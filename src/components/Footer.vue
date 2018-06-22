<template>
    <ul class="footer">
        <li v-for="(item,index) in footerList" :key="index" @click="active(index,item)" :class="item.flag?'active':''">
            <router-link :to="{name:item.name}">
                <i :class="item.icon"></i>
                <span>{{item.text}}</span>
            </router-link>
        </li>
    </ul>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            footerList:[],
        }
    },
    mounted(){
        axios.get('/server/data.json').then(data=>{
            this.footerList = data.data.footer
        })
    },
    methods:{
        active(index,item){
            this.footerList.map((res,ind)=>{
                if(index === ind){
                    res.flag = true
                }else{
                    res.flag = false
                } 
            })
        }
    }
}
</script>
