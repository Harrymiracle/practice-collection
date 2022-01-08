// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import 'vue-ydui/dist/ydui.base.css';
import {TabBar, TabBarItem} from 'vue-ydui/dist/lib.rem/tabbar';
// import VueResouse from 'vue-resource'
import YDUI from 'vue-ydui'

// Vue.component(TabBar.name, TabBar);
// Vue.component(TabBarItem.name, TabBarItem);

// Vue.use(VueResouse);
Vue.use(YDUI);
Vue.use(require('vue-wechat-title'))



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
