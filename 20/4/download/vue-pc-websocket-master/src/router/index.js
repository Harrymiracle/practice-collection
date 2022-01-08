import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import Login from '@/views/login'
import store from '../store'
import Cookies from  'js-cookie'

Vue.use(Router)

 const router  = new Router({
  routes: [
    {
      path: '/login',
      name:'login',
      component: Login,
    },
    {
      path: '/',
      component: home,
      children:[
        {
          path: '',
          name:'',
          component: resolve => { require(['@/views/components/chat.vue'], resolve);},
          children:[
            {
              path: '/chatList',
              name:'chatList',
              components:{
                menu:resolve => { require(['@/views/components/linkMan/userList.vue'], resolve);},
                chat:resolve => { require(['@/views/components/chatRoom.vue'], resolve);},
                info:resolve => { require(['@/views/components/operation.vue'], resolve);}
              },
            },
            {
              path: '/adressList',
              name:'adressList',
              components:{
                menu:resolve => { require(['@/views/components/linkMan/adressList.vue'], resolve);},
                chat:resolve => { require(['@/views/components/detailInfo.vue'], resolve);},
                info:resolve => { require(['@/views/components/operation.vue'], resolve);}
              }
            },
            {
              path: '/searchList',
              name:'searchList',
              components:{
                menu:resolve => { require(['@/views/components/linkMan/searchList.vue'], resolve);},
                chat:resolve => { require(['@/views/components/detailInfo.vue'], resolve);},
                info:resolve => { require(['@/views/components/operation.vue'], resolve);}
              }
            }
          ]
          },
      ]
    }
  ]
});
router.beforeEach((to,from,next) =>{
  if (!store.state.loginInfo.loginName&& to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    });
  } else if (store.state.loginInfo.loginName && to.name === '') {  // 判断是否已经登录且前往的是登录页
    next({
      name:'chatList'
    })
  }else {
    next()
  }
});
export default router
