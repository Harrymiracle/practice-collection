<template>
    <div class="navigationBar" :class="{fixedBg:isOpen}">

        <router-link to="/shopCar" class="tabItem shopCar" :class="{shopCarOpen:isOpen}" >
          <span v-show="isOpen">购物车</span>
          <i class="icon-shopCar"></i>
        </router-link>


        <router-link to="/" class="tabItem" :class="{shopIndexOpen:isOpen}">
          <span v-show="isOpen">店铺主页</span>
          <i class="icon-home"></i>
        </router-link>

        <router-link to="/goodsList" class="tabItem" :class="{shopListOpen:isOpen}">
          <span v-show="isOpen">商品列表</span>
          <i class="icon-list"></i>
        </router-link>


        <router-link to="/orderCenter" class="tabItem" :class="{orderCenterOpen:isOpen}" >
          <span v-show="isOpen">订单中心</span>
          <i class="icon-order"></i>
        </router-link>

        <router-link to="/activitieSquare" class="tabItem" :class="{actSquareOpen:isOpen}">
          <span v-show="isOpen">活动广场</span>
          <i class="icon-activite"></i>
        </router-link>
        <div class="tabItem"  @click="isClick" :class="{rotate180:!isOpen,rotate0:!isOpen}">
          <i class="icon-cha" v-show="isOpen"></i>
          <i v-show="!isOpen" class="isOpen" >导航</i>

        </div>

    </div>

</template>

<script>


    export default {
        name: 'hello',
        data () {
            return {
              isOpen:false
            }
        },
        created(){

        },
        mounted(){

        },
      methods: {
        isClick:function() {
              if(this.isOpen){
                this.isOpen = false;
              }else {
                this.isOpen = true;
              }
            }
          },
        components: {

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    @import '../assets/style/ximin.scss';
    @import url("../assets/style/icon.scss");
    @function torem($px){
      @return $px / 75px * 1rem;
    }
    .navigationBar{
      width: 100%;
      height: 100%;

      .tabItem{
        display: block;
        position: absolute;
        right:torem(9px);
        bottom:torem(180px);
        background: $colorBgWithe;
        @include borderRadius(torem(86px))
        width:torem(86px);
        height: torem(86px);
        line-height: torem(86px);
        text-align: center;
        margin-top:torem(12px);
        border:1px solid $colorBorder;
        font-size:0;
       -webkit-transition:all .3s;
        i{
          font-size: torem(48px);
          color: $colorRed;
          vertical-align: middle;
        }
        span{
          position: absolute;
          left:torem(-122px);
          color:$colorBgWithe;
          font-size: 14px;
        }
        .isOpen{
          font-size:torem(24px);
        }
      }
      .shopCar{
        bottom:torem(280px);
      }
      .shopCarOpen{
        bottom:torem(680px);
      }
      .shopIndexOpen{
        bottom:torem(280px);
      }
      .shopListOpen{
        bottom:torem(380px);
      }
    .orderCenterOpen{
      bottom:torem(480px);
    }
    .actSquareOpen{
      bottom:torem(580px);
    }
    .rotate0{
      webkit-transform: rotateY(0deg);
    }

    .rotate180{
      webkit-transform: rotateY(180deg);
    }

    }
    .fixedBg{
      position: fixed;
      background: rgba(0,0,0,.75);
    }


</style>
