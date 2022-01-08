// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import Detail from './components/Detail'

import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            component: App,
            children: [
                { path: '/', component: Home },
                { path: '/home', component: Home },
                { path: '/detail', component: Detail }
                //	{path: '/add', component: Add}
            ]
        }

    ]
});

/* eslint-disable no-new */
new Vue({
    router,
    // template: '<App/>',
    // components: { App }
    // render: h => h(App) //等同于上面两行，上面把内容渲染在了component: App中，其他作为它的children,就可以不要这两种配置。
}).$mount('#app');