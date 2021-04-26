<template>
<nav>
  <ul>
      <router-link to="/film" tag="li" active-class="active">
      <!-- 使用字体图标 -->
      <i class="iconfont icon-dianying"></i>
      <span>电影</span>
      </router-link>
      <router-link to="/cinema" tag="li" active-class="active">
      <i class="iconfont icon--dianyingyuan"></i>
      <span>影院</span>
      </router-link>
      <router-link to="/center" tag="li" active-class="active">
      <i class="iconfont icon-my"></i>
      <span>我的</span>
      </router-link>
  </ul>
</nav>
</template>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 20px;
  z-index:99;
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
