<template>
    <div class="goodsDetial">
      <template>
        <yd-slider :ready="start1" autoplay="3000">
          <yd-slider-item v-for="item in list">
              <img :src="item">
          </yd-slider-item>
        </yd-slider>
      </template>
      <div class="goodsD_info">
        <div class="goodsD_title">{{title}}</div>
        <div class="goodsD_markprice">{{marketprice}}</div>
        <div class="goodsD_productprice">{{productprice}}</div>
      </div>
      <!--<div @click.native="show2 = true">ddd</div>-->
      <yd-button size="large" type="warning" @click.native="show2 = true">下部弹出</yd-button>
      <yd-popup v-model="show2" position="bottom" height="60%">
        <yd-button type="warning" style="margin: 30px;" @click.native="show2 = false">Close Bottom Popup</yd-button>
      </yd-popup>

    </div>
</template>

<script>
    export default {
        name: 'goodsDetial',
        data () {
            return {
              start1: false,
              list: [],
              title:"现代舒适床",
              marketprice: 56.23,
              productprice: 89.36,
              show2: false
            }
        },

        computed: {},
        create(){

        },
        mounted(){
          setTimeout(() => {
            this.list = [
              'http://static.ydcss.com/uploads/ydui/1.jpg',
              'http://static.ydcss.com/uploads/ydui/2.jpg',
              'http://static.ydcss.com/uploads/ydui/3.jpg',
              'http://static.ydcss.com/uploads/ydui/2.jpg'
            ];
            this.start1 = true;
          }, 1500);
        },
        methods:{

        }
        , components: {},

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import url('../../assets/style/ximin.scss');

    @function torem($px) {
    @return $px/ 75px * 1rem;
    }
</style>
