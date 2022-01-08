// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router/'

import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'

Vue.use(VueRouter)
    // Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */

// var bus = new Vue({}); //可以不要

new Vue({
    el: '#app',
    router,
    // data: { //可以不要
    //     bus: bus
    // },
    template: '<App/>',
    components: { App },
    // render: h => h(App) //可以不要
})