// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import LogTime from './components/LogTime'
import TimeEntries from './components/TimeEntries'

import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'

import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'

Vue.use(VueRouter);
// Vue.use(VueResource);

Vue.config.productionTip = false

var router = new VueRouter({
    routes: [{
        path: '/',
        component: Home
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/time-entries',
        component: TimeEntries,
        children: [{
            path: 'log-time',
            component: LogTime
        }]
    }, {
        path: '*',
        redirect: '/home'
    }],
    mode: 'history'
})

var bus = new Vue({});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    //   data: {
    //   	bus: bus
    //   },
    render: h => h(App),
    //   template: '<App/>',
    //   components: { App }
})