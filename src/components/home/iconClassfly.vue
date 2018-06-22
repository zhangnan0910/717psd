<template>

    <ul class="icon_box">
        <li v-for="item in data">
            <img :src="item.url" alt="">
            <span>{{item.text}}</span>
        </li>
    </ul>
</template>
<script>
export default {
    props:['data']
}
</script>

