<template>
    <div class="swiper-container" :class="swiperclass">
       <div class="swiper-wrapper">
         <!-- 预留插槽 -->
           <slot></slot>
       </div>
    </div>
</template>

<script>
// 必须要下载swiper  使用npm install --save swiper命令来下载swiper
// 引入swiper.js，要实现分页器必须引入 swiper-bundle.js脚本文件
import Swiper from 'swiper/bundle'
// 引入swiperCSS
import 'swiper/swiper-bundle.min.css'
export default {
  // 在DetailSwiper.vue子组件中通过props来接收Detail.vue父组件传递过来的数据
  props: {
    perslide: {
      type: Number,
      default: 1
    },
    swiperclass: {
      type: String,
      default: 'swiper-container'
    }
  },
  mounted () {
    var a = new Swiper('.' + this.swiperclass, {
      // 一次显示3张图片
      slidesPerView: this.perslide,
      // 每张图片间隔30px
      spaceBetween: 20,
      // 开启freeMode模式
      freeMode: true
    })
    console.log(a)
  }
}
</script>

<style scoped>
.swiper-wrapper img {
  width: 100%;
  height: 80%;
}
.swiper-photos {
  margin-bottom: 50px;
}
</style>
