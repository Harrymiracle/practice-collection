<template>
<div class="main">
<top></top>
  <div class="main_content">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
  import $ from  'jquery'
  import Top from './components/Header'
    export default {
        name: "home",
      components:{
        Top,
      },
      data () {
        return {
          intervalId:null,  // 登录超时定时器
        }

      },
      computed :{
        time () {
          return this.$store.state.time;
        }
      },
      methods: {
      },
      mounted () {
        this.$store.commit('initWebSocket');
         this.intervalId = setInterval(()=> {
          $('body').on('keydown mousedown', (e)=> { // 键盘鼠标操作
            if (this.time>0) {
              this.$store.state.time=60*60*24;
            }else {
              this.time = 0;
              clearInterval(this.intervalId);
            }
          });
          this.$store.state.time--;
          if (this.time==0) {
            sessionStorage.setItem('time',0);
            clearInterval(this.intervalId);
          }

        }, 1000);
      }
    }
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
  .main_content {
    width: 100%;
    min-width: 1200px;
    height: calc( 100% - 60px );
    min-height: 610px;
    background: #F0F2F5;
    padding: 30px 0;
    box-sizing: border-box;
  }
}
</style>
