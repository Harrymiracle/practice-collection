<template>
  <div id="app">
    <n-header @tog="changeSideShow"></n-header>
    
    <router-view></router-view>

    <n-sidebar @hid="changeSideShow" :is-show="sideShow"></n-sidebar>


    <n-footer></n-footer>
  </div>
</template>

<script>
  import nHeader from './components/header'
  import nFooter from './components/footer'
  import nSidebar from './components/sidebar'

  export default {
    name: 'app',
    data(){
      return {
        sideShow: false
      }
    },
    components: {nHeader, nFooter, nSidebar},
    methods: {
      changeSideShow(){
        this.sideShow = !this.sideShow;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  
</style>
