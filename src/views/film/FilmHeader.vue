<template>
    <div>
         <ul>
            <router-link to="/film/comingsoon" tag="li" active-class="active">正在热播</router-link>
            <router-link to="/film/nowplaying" tag="li" active-class="active">即将上映</router-link>
         </ul>
    </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  display: flex;
}
li {
  flex: 1;
}
.active {
  color: orange;
  border-bottom: red 1px solid;
}
</style>
