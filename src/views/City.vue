<template>
   <div>
     <van-index-bar :index-list="computedCityList" @select="handleSelect">
        <div v-for="item in citylist" :key="item.type">
           <van-index-anchor :index="item.type" />
           <van-cell :title="data.name" v-for="(data, index) in item.list" :key="index" @click="handlePage(data.name, data.cityId)"/>
        </div>
      </van-index-bar>
    </div>
</template>

<script>
// 引入封装号的http发送ajax请求
import http from '@/util/http.js'
// 引入Vue
import Vue from 'vue';

// 引入轻提示组件
import { Toast } from 'vant';

import { mapMutations } from 'vuex'

// 全局注册该组件
Vue.use(Toast);

// 引入需要的组件
import { IndexBar, IndexAnchor, Cell } from 'vant';

// 全局注册组件
Vue.use(IndexAnchor).use(IndexBar).use(Cell);
export default {
  data() {
    return {
      citylist: []
    }
  },
  computed: {
    computedCityList() {
      // this.citylist.map(item => item.type)表示将citylist大对象映射出只好用type类型的首字母
      return this.citylist.map(item => item.type)
    }
  },
  // 在mounted生命周期中请求数据
  mounted() {
    http({
      url:'/gateway?k=1075684',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)
      //处理传过来的data数据格式
      this.citylist = this.handleCityData(res.data.data.cities)
    })
  },
  // 定义一个handleCityData方法来处理数据格式
  methods: {
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    handleCityData(cities) {
      // 该函数的作用就是输入原始数据，输出处理后的目标数据
     console.log(cities)
    //  1、首先要创建26个英文字母
    let letterArr = []

    //  6、定义一个空的目标数组
    let newCities = []
    for (let code=65; code<91; code++) {
      // 2、String.fromCharCode(code)表示将65-91之间的数字转换成大写的英文字母
      console.log(String.fromCharCode(code))

      // 3、将转换后的英文字母放到letterArr数组中
      letterArr.push(String.fromCharCode(code))
    }
    // console.log(letterArr)
    // 4、遍历26个英文字母
    letterArr.forEach((letter) => {
      //  5、新建一个数据用于过滤原始数据,
      // item.pinyin.substring(0,1).toUpperCase()表示截取原始数据pinyin下的首字符，并将其转换成大写字母
      let list = cities.filter(item => item.pinyin.substring(0,1).toUpperCase() === letter)
      // console.log(list)

      // 7、若列表为空，则给空的目标数组赋值
      if(list.length > 0) {
        // 8、将转换后的原始数据赋值给新的空的目标数据
         newCities.push({
           type: letter,
           list
         })
      }
    })
    console.log(newCities)
    //  9、返回目标数据
   return newCities
    },
    handleSelect(index) {
      console.log(index)
      Toast(index);
    },
    // 点击某一项返回上一页
    handlePage(name, cityId) {
      // 记录cityId和cityName
      // this.$store.state.cityName = name

      this.changeCityName(name)
      this.changeCityId(cityId)
      this.$router.back()
    }
  }

}
</script>
</html>
