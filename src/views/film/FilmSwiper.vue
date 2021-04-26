<template>
    <div class="swiper-container">
       <div class="swiper-wrapper">
         <!-- 预留插槽 -->
           <slot></slot>
       </div>
       <!-- 分页器 - 小圆点 -->
       <div class="swiper-pagination"></div>
    </div>
</template>

<script>
// 必须要下载swiper  使用npm install --save swiper命令来下载swiper
// 引入swiper.js，要实现分页器必须引入 swiper-bundle.js脚本文件
import Swiper from 'swiper/bundle'
// 引入swiperCSS
import 'swiper/swiper-bundle.min.css'
export default {
  mounted () {
    var a = new Swiper('.swiper-container', {
      // 实现分页器效果,小圆点
      pagination: {
        el: '.swiper-pagination'
      }
    })
    console.log(a)
  }
}
</script>
