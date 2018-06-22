<template>
    <div class="swiper-container" ref='banner'>
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="@/static/img/home/banner/4.jpg" alt=""></div>
            <div class="swiper-slide"><img src="@/static/img/home/banner/5.jpg" alt=""></div>
            <div class="swiper-slide"><img src="@/static/img/home/banner/6.jpg" alt=""></div>
            <div class="swiper-slide"><img src="@/static/img/home/banner/7.jpg" alt=""></div>
            <div class="swiper-slide"><img src="@/static/img/home/banner/8.jpg" alt=""></div>
        </div>
        <!-- <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    mounted(){
        new Swiper(this.$refs.banner,{
            loop:true,
            autoplay:true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        }) 
    }
}
</script>
<style scoped>
.swiper-container{
    width: 100%;
}
.swiper-container .swiper-slide img{
    width: 100%;
}
</style>


