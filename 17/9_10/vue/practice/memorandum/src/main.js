// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/router'
import store from './store/store'

import './config/rem'
import './style/common.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app');
