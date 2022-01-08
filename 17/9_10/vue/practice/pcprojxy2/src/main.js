// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import vueResource from 'vue-resource'
Vue.use(vueResource)
Vue.config.productionTip = false
Vue.use(VueLazyload)
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  template: '<App/>',
  components: { App }
     // render:h=>h(App)
}).$mount('#app')
