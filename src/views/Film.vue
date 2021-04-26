<template>
  <div>
   
   <film-swiper>
     <!-- 遍历图片 -->
      <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
        <!-- 图片实现轮播 -->
        <div :style=" {backgroundImage:'url('+item+')'} " style="height: 200px; background-size:cover;background-position:center">

        </div>
      </div>
   </film-swiper>
    <film-header style="height:50px; line-height: 50px; text-align: center; position:sticky; top:0; left:0;z-index:100;background: white"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import filmHeader from './film/FilmHeader.vue'
import filmSwiper from './film/FilmSwiper.vue'


export default {
  // 模拟图片静态数据
  data () {
    return {
      imgList: [
        'https://static.maizuo.com/v5/upload/243fed390c26e804ef8b42ff4b030723.jpg',
        'https://static.maizuo.com/pc/v5/usr/movie/b6531574f2b8d431c540ecdcd539f1d4.jpg?x-oss-process=image/quality,Q_70',
        'https://static.maizuo.com/pc/v5/usr/movie/637447e2e85b1efebbc53bc05098d363.jpg?x-oss-process=image/quality,Q_70'
      ]
    }
  },
  components: {
    filmHeader,
    filmSwiper
  }
}
</script>
<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 20px;

  background-color: #fff;
}
nav ul {
  list-style: none;
  display: flex;
}
nav ul li {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.active{
  color: red
}
</style>
