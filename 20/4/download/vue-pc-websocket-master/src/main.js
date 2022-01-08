// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import './assets/theme/index.less'
import store from './store'
import icon from  './commons/images'
//引入图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import local from './commons/local'
import audio from 'vue-mobile-audio';
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css');
import axios from 'axios';
import com from './commons/com';
import "babel-polyfill";
import zhCN from './commons/player-zh-CN'
import $ from 'jquery'

// 获取静态配置文件
axios.get('/static/config.json?random='+Math.random()).then((res) => {
  com.ajax.defaults.baseURL = process.env.NODE_ENV=='development'?process.env.API_ROOT:res.data.baseURL
  Vue.prototype.$webSocket = res.data.webSocketURL;
  Vue.prototype.$baseURL = res.data.baseURL;
  VideoPlayer.videojs.addLanguage('zh-CN',zhCN);
  Vue.use(VideoPlayer);
  Vue.use(Viewer, {
    defaultOptions: {
      zIndex: 9999,
    }
  });
  Vue.use(iView);
  Vue.use(local);
  Vue.use(audio);
  Vue.config.productionTip = false;
  Vue.prototype.icon = icon;

  Vue.directive ('scroll-bottom',function (el,binding) { // 最新消息显示在底部
    Vue.nextTick(() => {
      if (binding.value === 1) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      } else if (binding.value === 2) {
        let index =20;
        if ($(".messageList").length%20 !== 0) {
          index = $(".messageList").length%20
        }
        let scrollToContainer = $('.messageList').eq(index)
        el.scrollTop = scrollToContainer.offset().top - $(el).offset().top + $(el).scrollTop()-$(el).height()
      } else {
        el.scrollTop = 0;
      }
    });
  });

  window.vm=new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  });
});


