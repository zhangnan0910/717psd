<template>
    <div>
       
        <router-view></router-view>
        <Footer />
    </div>
    
</template>
<script>

import  './index.css'


import Footer from '@/components/Footer'


export default {
    components:{
        Footer,
    }
}
</script>
<style scoped>


</style>

