<template>
  <div id="app">
  <router-view/>
</div>
</template>

<script lang='ts'>

export default {
  name:'App'
}
</script>

<style lang="scss">
@import "src/assets/style/reset.scss";
@import "src/assets/style/helper.scss";
body{
  line-height:1.5;
  font-size: 16px;
}
#app{
  color:#333;
  font-family:$font-hei;
}
</style>