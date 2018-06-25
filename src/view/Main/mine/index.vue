<template>
    <div  class="main">
        <Top/>
        <Link/>
        <div class="line"></div>
        <Link1/>
        <DialogTips ref='Tips'>提示信息</DialogTips>
    </div>
</template>
<script>
import Top from './mine_top'
import Link from './mine_link'
import Link1 from './mine_link1'
export default {
    name:'mine',
    components:{
        Top,
        Link,
        Link1
    }
}
</script>
<style lang="less" scoped>
    
    .line{
        height: 20/75rem;
        background: #eee;
    }
</style>


