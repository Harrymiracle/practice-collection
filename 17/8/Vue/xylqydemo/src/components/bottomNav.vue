<template>
    <div class="bottomNav">
      <router-link to="/shopIndex" class="tabItem active"  ><i class="icon-home"></i><span class="tabTxt ">店铺主页</span></router-link>
      <router-link to="/goodsList" class="tabItem" active-class="active"><i class="icon-list"></i><span class="tabTxt">商品列表</span></router-link>
      <router-link to="/orderCenter" class="tabItem"><i class="icon-order"></i><span class="tabTxt">订单中心</span></router-link>
      <router-link to="/shopCar" class="tabItem"><i class="icon-shopCar"></i><span class="tabTxt">购物车</span></router-link>
      <router-link to="/activitieSquare" class="tabItem"><i class="icon-activite"></i><span class="tabTxt">活动广场</span></router-link>

    </div>
</template>

<script>
    export default {
        name: 'bottomNav',
        data () {
            return {}
        },

        computed: {},
        create(){

        },
        mounted(){

        },
        methods: {}
        , components: {},

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import url('../assets/style/ximin.scss');
    @function torem($px) {
      @return $px/ 75px * 1rem;
    }
  .bottomNav{
    color:#666;
    display: -webkit-box;
    display: flex;
    padding-top:torem(12px);
    background:#fff;
    .active{
      color:#d80c18;
    }
    i{
      font-size: torem(40px);
      display: block;
    }
    .tabItem{
      -moz-box-flex: 1;
      flex: 1;
      text-align:center;
      font-size:0;
      .tabTxt{
        display: inline-block;
        font-size: 13px;
        height:torem(32px);
        line-height: torem(32px);
        /*color:#666;*/
      }
    }
  }
</style>
