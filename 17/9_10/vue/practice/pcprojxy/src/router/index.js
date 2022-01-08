import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Home from '@/components/Home'
import AboutMe from '@/components/AboutMe'
import Index2 from '@/components/Index2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: 'Index2',
          name: 'index2',
          component: Index2
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: AboutMe,
      meta: {title: '关于我'}
    }
  ]
})
