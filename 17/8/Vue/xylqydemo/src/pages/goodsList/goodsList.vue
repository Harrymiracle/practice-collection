<template>
  <div class="goods" ref="goods" :style="{height:scrollHeight}" >
    <ul class="goods_wrap" >
      <li class="goods_item" v-for="(item,index) in goodsList" @click="goodsClick(index,$event)">
        <img :src="item.img" alt="">
        <div class="goods_info">
          <div class="title">{{item.title}}</div>
          <div class="price">￥{{item.marketprice}}</div>
        </div>
      </li>
    </ul>
    <navigationBar></navigationBar>
  </div>
</template>

<script>
  import getDatas from '../../service/getDatas'
  import comJs from '../../assets/js/comJs'
//  import BScroll from 'better-scroll'
  import navigationBar from '../../components/navigationBar'
export default {
  name: 'goodsList',
  data () {
    return {
      goodsList: [],
      pageHeight:document.body.clientHeight, //页面一屏的高度
      scrollTop:0,
      allHeight:0,
      hasNext:false,       //是否有下一页
      currentPage:1       //页码
    }
  },
  computed:{
    scrollHeight:function () {//设置出现滚动条的高度
      let browserHeight = document.body.clientHeight,
          height = browserHeight;
      return height+"px";
    }
  },
  created(){

  },
  mounted(){
    this._init();
  },
  methods:{
    _init() {
      let _this = this,
          goods =  this.$refs.goods;
      goods.addEventListener('scroll', function () {
        _this.onScroll(goods);
      })
      this.sendAjax();
    },

      onScroll: comJs.debounce(function (element) {
        if (element) {
          let scorllTop = element.scrollTop,
            scorllHeight = element.scrollHeight,
            visibleHeight = element.offsetHeight;
          console.log(scorllTop,scorllHeight,visibleHeight)
          if (scorllTop + visibleHeight >= scorllHeight) {
            console.log(1)
            this.sendAjax();
          }
        }
        else {
          return;
        }
      }, 1000),

    sendAjax(thisPage){
    /*  let sendData = {//组织ajax数据
        'target_page':String(thisPage)
      }*/
      getDatas.getGoods().then((res) => {  //发送请求
        let data = res.data;
        if (data.result == 1) {
          this.goodsList.push.apply(this.goodsList, data.data);
        }
      }).catch((res) => {

        })
    },
    goodsClick:function(index,event){
      alert(1)
      this.$router.push('/goodsDetial');
    }

  }

  , components:{
    navigationBar:navigationBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/style/ximin.scss';
  @function torem($px){
  @return $px / 75px * 1rem;
  }
  .goods{
    overflow: auto;
  }
  .goods_item{
    width:torem(268px);
    float:left;
    img{
     width: 100%;
    }
    .goods_info{
      padding: torem(12px) ;
    }
    .title,.price{
      line-height: torem(32px);
      font-size: 16px;
      @include ellipsis;
    }
    .price{
      color:$colorRed;
    }
  }
  .goods_item:nth-of-type(2n-1){
    margin-right: 14px;
  }

</style>
