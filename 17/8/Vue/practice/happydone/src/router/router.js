import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: App,
      children: [
      	{
      		path: '',
      		component: r => require.ensure([], () => r(require('../pages/home')), 'home')
      	},{
      		path: '/item',
      		component: r => require.ensure([], () => r(require('../pages/item')), 'item')
      	},{
      		path: '/score',
      		component: r => require.ensure([], () => r(require('../pages/score')), 'score')
      	}
      ]
    }
  ]
})
