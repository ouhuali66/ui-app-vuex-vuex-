<template>
  <div>
    center
  </div>
</template>

<script>
export default {
  // 设置局部路由拦截
  beforeRouteEnter (to, from, next) {
    // 验证token
    // console.log('验证token')
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  }
}
</script>
