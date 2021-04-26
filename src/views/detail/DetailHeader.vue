<template>
 <div>
     {{title}}
</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
div {
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align:center;
    background: white;
}
</style>
