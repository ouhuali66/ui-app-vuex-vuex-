<template>
  <!-- 渲染出错时必须要设置 v-if="filminfo"才能解决 -->
  <div v-if="filminfo">
    <detail-header v-top :title="filminfo.name"></detail-header>
      <div :style="{backgroundImage:'url('+ filminfo.poster+')'}" style="height:200px; background-size:cover; background-position: center" >
      </div>
      <div class="title1">
          <h3>{{filminfo.name}}
          </h3>
          <span>{{filminfo.filmType.name}}</span>
            <span>{{filminfo.grade}}</span>
          <p>{{filminfo.category}}</p>
          <p>{{filminfo.premiereAt | dateFilter}}上映</p>
          <p>{{filminfo.nation}} | {{filminfo.runtime}}分钟</p>
          <div :class="isShow? '':'synopsis'">{{filminfo.synopsis}}</div>
          <div style="text-align:center">
            <i class="iconfont" :class="isShow?'icon-arrow-up':'icon-shangjiantou'" @click="isShow=!isShow"></i>
          </div>
          <h2>演职人员</h2>
          <!-- swiperclass="swiper-actors"解决两个detail-swiper组件共用一个轮播组件产生的bug -->
          <detail-swiper :perslide="3" swiperclass="swiper-actors">
           <div class="swiper-slide" v-for="(data, index) in filminfo.actors" :key="index">
               <img :src="data.avatarAddress"/>
               <div>
                   <div>{{data.name}}</div>
                   <div>{{data.role}}</div>
               </div>
           </div>

          </detail-swiper>
          <h3>剧照</h3>
          <detail-swiper :perslide="2" swiperclass="swiper-photos" style="margin-bottom: 50px">
              <div class="swiper-slide" v-for="(data, index) in filminfo.photos" :key="index">
                <div :style="{backgroundImage:'url('+data+')'}" style="height:200px;background-size:cover;background-position:center;" @click="handlePreview(index)"></div>
              </div>
          </detail-swiper>
      </div>

  </div>
</template>

<script>
// 引入Vue模块用于创建定时器
import Vue from 'vue'
// 引入moment模块库用于处理日期格式
import moment from 'moment'

// 引入detaliSwiper组件
import detailSwiper from './detail/DetailSwiper.vue'
import detailHeader from './detail/DetailHeader.vue'
import http from '../util/http'

import { ImagePreview } from 'vant';



// 定义日期过滤器
Vue.filter('dateFilter', (date) => {
  // 日期处理函数 - 使用moment模块完成  使用 npm install moment --save 命令下载moment模块库
  return moment(date * 1000).format('YYYY-MM-DD')
})

// 定义自定义指令
Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 50) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 指令的销毁声明周期
  unbind () {
    window.onscroll = null
  }
})
export default {
  // 定义一个空数组
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  components: {
    detailSwiper,
    detailHeader,
  },
  methods: {
    handlePreview(index) {
       ImagePreview({
         images: this.filminfo.photos,
         startPosition: index,
       });
    }
  },
  mounted () {
    //进入详情页面时隐藏tabbar
    this.$store.commit("hideTabbar")
    console.log('利用获取的id，ajax请求后端接口', this.$route.query.id)
    http({
      // url: `https://m.maizuo.com/gateway?filmId=${this.$route.query.id}&k=997805 `, //动态添加路由方式1
      url: `/gateway?filmId=${this.$route.params.myid}&k=997805 `, // 动态添加路由方式2
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filminfo = res.data.data.film
    })
  },
  beforeDestroy() {
   //离开详情页面时显示tabbar
   this.$store.commit("showTabbar")
  }
  // 详情数据的接口
  // https://m.maizuo.com/gateway?filmId=5426&k=997805
  // https://m.maizuo.com/gateway?filmId=5386&k=4415473
}
</script>

<style scoped>
.title1 {
  margin-left: 8px;
}
.synopsis {
  height: 50px;
  overflow: hidden;
}
</style>
