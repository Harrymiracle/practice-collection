import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Element from '@/components/Element'
import Iview from '@/components/Iview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/element',
      name: 'Element',
      component: Element
    },
    {
      path: '/iview',
      name: 'Iview',
      component: Iview
    }
  ]
})
