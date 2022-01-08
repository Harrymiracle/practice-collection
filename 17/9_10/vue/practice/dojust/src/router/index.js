import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
    	path: '/',
    	component: App,
    	children: [
        {
          path: '',
          component: r => require.ensure([], () => r(require('../components/itemContainer')), 'item-container')
        },
        {
          path: '/item-container',
          component: r => require.ensure([], () => r(require('../components/itemContainer')), 'item-container')
        },
        {
          path: '/event-detail',
          component: r => require.ensure([], () => r(require('../components/event_detail')), 'event-detail')
        },
    	]
    },
  ]
});
