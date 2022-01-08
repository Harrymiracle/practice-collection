// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import animate from 'vue2-animate/dist/vue2-animate.min.css'
//import './assets/css/mui.css'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
//其余页面我引好了jquery，要改变vue配置，但index.html可以单独引入jquery吗，我引jquery后再打印$，结果是未定义。