<template>
  <div class="test">
    <bottomNav></bottomNav>
    <template>
      <yd-tabbar activeColor="#d80c18">
        <yd-tabbar-item title="店铺主页" link="/shopIndex" active>
          <yd-icon class="icon-home" slot="icon" ></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="商品列表" link="/goodsList" >
          <yd-icon class="icon-list" slot="icon" size="0.45rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="订单中心" link="/orderCenter">
          <yd-icon class="icon-order" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="/shopCar">
          <yd-icon class="icon-shopCar" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="活动广场" link="/activitieSquare">
          <yd-icon class="icon-activite" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
      </yd-tabbar>
    </template>
  </div>
</template>

<script>
  import bottomNav from '../../components/bottomNav'
//  import navigationBar from '../../components/navigationBar'
export default {
  name: 'shopIndex',
  data () {
    return {
      msg: 'activiteSquare'
    }
  },
  create(){

  },
  mounted(){

  },
  methods:{

  }
  , components:{
    bottomNav:bottomNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @function torem($px){
  @return $px / 75px * 1rem;
  }

  .test {font-size: torem(32px);}
</style>
