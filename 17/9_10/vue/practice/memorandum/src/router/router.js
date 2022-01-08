import Vue from 'vue'
import Router from 'vue-router'

const App = r => require.ensure([], () => r(require('../App')), 'app')
const Home = r => require.ensure([], () => r(require('../views/home/')), 'home')
const Item = r => require.ensure([], () => r(require('../views/item/')), 'item') 


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '', component: Home
        },{
      		path: '/home', component: Home
      	},{
      		path: '/item', component: Item
      	}
      ]
    },{
      path: '*', redirect: '/Home'
    }
  ],
  mode: 'history'
})
