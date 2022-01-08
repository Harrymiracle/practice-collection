import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Come from '@/components/come'
import Index from '@/components/index'
import Login from '@/components/login'
import Index1 from '@/components/index1'
import Register from '@/components/register'
import Reset from '@/components/Reset'
import SerchPage from '@/components/SerchPage'
import AllotList from '@/components/allotList'
import Userinfor from '@/components/userinfor'
import Complete from '@/components/complete'
import Upload from '@/components/upload'
import Erweima from '@/components/erweima'
import Retainage from '@/components/retainage'
import RetainageList from '@/components/retainageList'
import History from '@/components/History'
import Center from '@/components/center'
import ResetAgin from '@/components/ResetAgin'
import Test2 from '@/components/test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/login/index1',
      name: 'Index1',
      component: Index1  
    }, {
      path: '/login/register',
      name: 'Register',
      component: Register
    }, {
      path: '/login/index1/SerchPage',
      name: 'SerchPage',
      component: SerchPage
    }, {
      path: '/login/index1/History',
      name: 'History',
      component: History
    }, {
      path: '/login/index1/Center',
      name: 'Center',
      component: Center
    }, {
      path: '/login/index1/Test2',
      name: 'Test2',
      component: Test2
    }, {
      path: '/login/index1/Center/ResetAgin',
      name: 'ResetAgin',
      component: ResetAgin
    }, {
      path: '/login/register/Reset',
      name: 'Reset',
      component: Reset
    }, {
      path: '/login/index1/SerchPage/allotList',
      name: 'AllotList',
      component: AllotList
    }, {
      path: '/login/index1/SerchPage/allotList/Userinfor',
      name: 'Userinfor',
      component: Userinfor
    }, {
      path: '/login/index1/SerchPage/allotList/Userinfor/Retainage',
      name: 'Retainage',
      component: Retainage
    }, {
      path: '/login/index1/SerchPage/allotList/Userinfor/Retainage/RetainageList',
      name: 'RetainageList',
      component: RetainageList
    }, {
      path: '/login/index1/SerchPage/allotList/Userinfor/Complete',
      name: 'Complete',
      component: Complete
    }, {
      path: '/login/index1/SerchPage/allotList/Userinfor/Complete/Upload',
      name: 'Upload',
      component: Upload
    }, {
      path: '/login/index1/SerchPage/allotList/Userinfor/Complete/Upload/Erweima',
      name: 'Erweima',
      component: Erweima
    }
  ]
})
