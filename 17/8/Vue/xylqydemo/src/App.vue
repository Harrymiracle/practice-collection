<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" img-set="assets/images/favicon.png"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import url('assets/style/com.scss');
  @import url("assets/style/icon.scss");

</style>
