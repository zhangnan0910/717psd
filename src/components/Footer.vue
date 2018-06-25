<template>
    <ul class="footer">
        <router-link tag='li' :to="{name:item.name}" v-for="(item,index) in footerList" :key="index" @click="active(index)" :class="flag?'active':''">
            <i :class="item.icon"></i>
            <span>{{item.text}}</span>
        </router-link>
    </ul>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            footerList:[],
            flag:false
        }
    },
    mounted(){
        axios.get('/server/data.json').then(data=>{
            this.footerList = data.data.footer
        })
    },
    methods:{
        active(){
            
        }
    }
}
</script>
