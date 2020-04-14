<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img v-lazy="slide" >
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination" id="span_active"></div>
  </swiper>
</template>

<script>
export default {
  name: "carousel",
  props: ["swiperSlides"],
  data() {
    return {
      swiperOption: {
         autoplay: true,//可选选项，自动滑动
        pagination: {
          el: ".swiper-pagination"
        },
        setWrappersize: true,
        observeParents: true
      }
    };
  },
  mounted() {}
};
</script>
<style scoped>

.swiper-container {
  width: 100%;
  background: rgb(250, 177, 42)
}
.swiper-container img {
  height: 150px;
  width: 100%;
  border: none;
  display: block;
}
</style>

<style>
.swiper-pagination-bullet{
  background:#ccc;
}
.swiper-pagination-bullet-active{
  background: #fff;
}
</style>

