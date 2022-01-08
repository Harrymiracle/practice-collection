import Vue from 'vue'
import Router from 'vue-router'
import activitieSquare from '../pages/activitieSquare/activitieSquare'
import goodsList from '../pages/goodsList/goodsList'
import goodsDetial from '../pages/goodsList/goodsDetial'
import orderCenter from '../pages/orderCenter/orderCenter'
import shopIndex from '../pages/shopIndex/shopIndex'
import shopCar from '../pages/shopCar/shopCar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '店铺首页',
      linkActiveClass:'active',
      meta: {
      title: '店铺首页'
    	},
      component: shopIndex
    },
    {
      path: '/activitieSquare',
      name: '活动广场',
      linkActiveClass:'active',
      meta: {
      title: '活动广场'
    	},
      component: activitieSquare
    },
    {
      path: '/goodsList',
      name: '商品列表',
      linkActiveClass:'active',
      meta: {
      title: '商品列表'
    	},
      component: goodsList
    },
    {
      name: '商品详情',
      path: '/goodsDetial', //商品详情
      component: goodsDetial,
      meta: {
        title: '商品详情'
      }
    },

    {
      path: '/orderCenter',
      name: '订单中心',
      meta: {
      title: '订单中心'
    	},
      component: orderCenter
    }, {
      path: '/shopCar',
      name: '购物车',
      meta: {
        title: '购物车'
      },
      component: shopCar
    }
  ]
})




