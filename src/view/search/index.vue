<template>
    <div>
        <Header><input type="text" v-model="msg" @input="change"></Header>
        <ul v-html="data">

        </ul>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
    data(){
        return{
            list:this.$route.params.data,
            msg:'',
            data:''
        }
    },
    methods:{
        change(){
            this.$http.get(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.msg}&dotime=1529338023000`).then(res=>{
                this.data = res
            })
        }
    },
    components:{
        Header
    }
}
</script>
<style scoped>

</style>

)