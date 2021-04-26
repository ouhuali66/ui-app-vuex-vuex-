<template>
<!-- search组件模块化拆分之后的结构代码 -->
  <div>
    <!-- @cancel="handleCancel()"表示绑定取消按钮 -->
     <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @cancel="handleCancel()"
  />
   <van-list>
      <van-cell v-for="data in computedCinemaList" :key="data.cinemaId">
        <div>{{data.name}}</div>
        <div class="address">{{data.address}}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
   import Vue from 'vue';
   import { Search, List, Cell } from 'vant';

   Vue.use(Search).use(List).use(Cell);
   export default {
     data() {
       return {
         value:""
       }
     },
      computed: {
      computedCinemaList () {
        if(this.value === '') return []
        return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
      }
     },
     mounted() {
      //  console.log(this.$store.state.cinemaList)
      // this.cinemaList = this.$store.state.cinemaList
      if(this.$store.state.cinemaList === 0) {
        // vuex异步流程
        this.$store.dispatch("getCinemaList", this.$store.state.cityId)
      }else {
        console.log('缓存')
      }
     },
     methods: {
      //  点击取消按钮返回cinema页面
        handleCancel() {
       this.$router.replace('/cinema') //返回到cinema页面， 点击取消按钮后在点击返回键不可以返回到search页面
      // this.$router.back() //返回上一页，点击取消按钮后在点击返回键还可以返回到search页面
      // this.$router.push('/cinema') //返回到cinema页面，点击取消按钮后在点击返回键还可以返回到search页面
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

</style>
