<template>
  <div id="app">
    <tabbar v-show="isTabbarShow"></tabbar>
    <section>
    <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from './components/Tabbar.vue'
import {mapState} from 'vuex'
export default {
  components: {
    tabbar
  },
  computed: {
    ...mapState('TabbarModule', ['isTabbarShow'])
  }
}
</script>
<style>
li {
  list-style: none;
}
* {
  margin:0;
  padding: 0;
  /* 解决移动端延迟300ms的方法 */
  touch-action: manipulation;
}
html, body {
  height: 100%;
}
section{
  margin-bottom: 50px;
}
</style>
