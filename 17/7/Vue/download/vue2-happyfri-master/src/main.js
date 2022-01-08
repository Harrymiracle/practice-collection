import Vue from 'vue'			//引入vue.js文件
import VueRouter from 'vue-router'		//引入路由js文件
import routes from './router/router'		//引入具体的路由设置
import store from './store/'			//引入状态管理js文件
import ajax from './config/ajax'	
import './style/common'
import './config/rem'

Vue.use(VueRouter);		//如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)


const router = new VueRouter({		//创建一个router实例
	// mode: 'history',				//history 模式时，URL 就像正常的 url
	routes
})

new Vue({
	router,
	store,
}).$mount('#app')