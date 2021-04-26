<template>
  <div>
    <!-- @click-left="handleLeft"表示绑定左边点击事件 @click-right="handleRight"表示绑定右边点击事件-->
    <van-nav-bar title="影院" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{$store.state.cityName}}<van-icon name="arrow-down" color="black"/>
      </template>
      <template #right>
        <van-icon name="search" size="18" color="black"/>
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{height: height}">
       <ul>
         <li v-for="data in $store.state.cinemaList" :key="data.cinemaId">
            <div>{{data.name}}</div>
            <div class="address">{{data.address}}</div>
         </li>
       </ul>
    </div>
  </div>
</template>
<script>

//navbar导航条
import Vue from 'vue';
import { NavBar, Icon } from 'vant';

// 全局注册组件
Vue.use(NavBar).use(Icon);
//引入better-scroll模块
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      height: 0
    }
  },
  methods: {
    handleLeft() {
      // 点击城市-上海按钮时情况cinemaList
      this.$store.commit("clearCinemaList")
      
      this.$router.push("/city")
    },
    handleRight() {
      this.$router.push("/search")
    }
  },
  // 请求数据
  mounted () {
    //访问cityName， cityId

    // 获取可视窗口的高度
    this.height = document.documentElement.clientHeight - 100 + 'px'

    if(this.$store.state.cinemaList.length === 0) {
      // 走vuex的异步流程,发送ajax异步请求数据
      this.$store.dispatch('getCinemaList', this.$store.state.cityId).then(res => {
        //  状态立即更改，但是dom异步渲染
          this.$nextTick( () => {
            new BScroll(".cinema", {
              // 设置滚动条
              scrollbar: {
                fade: true
              }
            })
          })
      })
    }else {
      // 打印缓存
      console.log('缓存')
      //  状态立即更改，但是dom异步渲染
          this.$nextTick( () => {
            new BScroll(".cinema", {
              // 设置滚动条
              scrollbar: {
                fade: true
              }
            })
          })
    }
  }
}
</script>
<style scoped>
li {
  padding: 8px;
}
 .address {
   font-size:12px;
   color: gray;
 }
 .cinema {
   /* height: 300px; */
   overflow: hidden;
   /* 修正滚动条的位置 */
   position: relative;
 }
</style>
// https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=1682950
