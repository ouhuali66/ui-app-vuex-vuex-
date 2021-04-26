<template>
  <div class="now">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多内容了"
  @load="onLoad"
  :immediate-check = "false"
>
      <!-- 必须要使用:key="item.id"来绑定key值 -->
      <van-cell v-for="item in datalist" :key="item.filmId" @click="handleClick(item.filmId)">
        <div class="left">
          <img :src="item.poster"/>
        </div>
        <div id="right">
           <h3>{{item.name}}</h3>
           <p>主演：{{ item.actors | actorFilter }}</p>
           <p>{{item.category}}</p>
           <p>{{item.nation}} | {{item.runtime}}分钟</p>
        </div>
      </van-cell>
   </van-list>
  </div>
</template>

<script>
// 安装axios并引入axios发送ajahttpx请求数据  使用 npm install axios命令来安装axios
import http from '@/util/http'

import Vue from 'vue';
import { List, Cell } from 'vant';

Vue.use(List).use(Cell);


// 定义过滤器
Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join('')
})


export default {
  data () {
    return {
      datalist: [],
      // 是否正在加载中，防止多次触发
      loading: false,
      finished: false,
      // 记录页数
      current: 1,
      // 数据总长度
      total: 0
    }
  },
  // 在mounted生命周期中发送ajax请求数据
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=3030777`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad() {
      console.log("到底了")
      if(this.datalist.length === this.total && this.datalist.length !==0) {
        this.finished = true
        return
      }

      this.current ++
      // 1、发送ajax请求新数据
      http({
        url:`/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=136082`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // 2、合并新数据到老数据中  ...this.datalist表示展开datalist数据
        this.datalist = [...this.datalist, ...res.data.data.films]
        // 3、防止多次触发
        this.loading = false
      })
    },
     handleClick (id) {
      console.log(id)
      // location.href = '#/center'
      // 路径跳转  编程式导航, this.$router表示拿到的是路由对象
      // this.$router.push(`/detail/${id}`)

      // 路由名称跳转 -动态添加路由方式2
      this.$router.push({
        name: 'demoDetail',
        // 设置参数
        params: {
          myid: id
        }
      })

      // 使用query实现路由跳转 - 动态添加路由方式1
      // this.$router.push(`/detail?id=${id}`)
    }
  }

}
</script>

<style scoped>

.van-cell {
  overflow: hidden;

}
.left {
  width: 25%;

}
.left img{
  width: 100px;
  float:left;
}
#right{
  width: 68%;
  float:right;
  margin-left: 8px;
}
#right p {
  /* 文字超出部分以省略符号显示，不换行 */
  /* 溢出隐藏 */
  overflow:hidden;
  /* 文字超出部分以省略号显示 */
  text-overflow: ellipsis;
  /* 文字不换行 */
  white-space: nowrap;

}


</style>
