<template>
  <div class="historyMap" >
    <div class="title">
      <Icon style="float: left;margin-top: 10px;" type="ios-pin" size="18" />
      <span>位置</span>
    </div>
    <div :id="id" class="allmap" ></div>
  </div>
</template>
<style lang="less">
  .historyMap {
    height:100%;width:100%;
    padding: 0 10px 10px;
    .title {
      height: 40px;
      line-height: 40px;
      background: #ffffff;
    }
    .allmap {
      height: calc(100% - 40px);
    }

  }
</style>

<script>
  export default {
    name: 'historyMap',
    props: {
      loaction: Array,
      request: true,
      id:String
    },
    data() {
      return {
      }
    },
    methods: {
      initMap(loactionCfg) {
        // let cfg = loactionCfg.split('|')
        // 经度
        let lng = loactionCfg[3]
        // 纬度
        let lat = loactionCfg[2]
        var map = new AMap.Map(this.id, {
          // 级别
          zoom: 16,
          // 中心点坐标
          center: [lng, lat]
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
          // map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
        var marker = new AMap.Marker({
          // 位置
          position: [lng, lat]
        })
        marker.setAnimation('AMAP_ANIMATION_BOUNCE')
        // 添加到地图
        map.add(marker)
      }
    },
    mounted() {

    },
    watch: {
      loaction: {
        handler: function(newVal, oldVal) {
          this.initMap(newVal)
        },
        deep: true
      }
    }
  }
</script>
