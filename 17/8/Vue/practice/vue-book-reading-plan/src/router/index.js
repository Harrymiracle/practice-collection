import Vue from 'vue'
import Router from 'vue-router'

//方法一、
import Home from '../components/Home'
import ShowBook from '../components/ShowBook'
import AddBook from '../components/AddBook'
import Detail from '../components/Detail'

Vue.use(Router)

//方法二、
// const Home = r => require.ensure([], () => r(require('../components/Home')), 'home')
// const ShowBook = r => require.ensure([], () => r(require('../components/ShowBook')), 'show-book')
// const AddBook = r => require.ensure([], () => r(require('../components/AddBook')), 'add-book')

//方法三、可以在上面不import, 在使用的地方直接 component: require('../components/Home')

export default new Router({
  routes: [
    {
      path: '/',
      // component: Home
      component: r => require.ensure([], () => r(require('../components/Home')), 'home')
    },{
      path: '/home',
      // component: Home	
      component: r => require.ensure([], () => r(require('../components/Home')), 'home')
    },{
      path: '/show-book',
      // component: ShowBook,
      component: r => require.ensure([], () => r(require('../components/ShowBook')), 'show-book'),
      children: [
      	{
      	  path: 'add-book',
      	  // component: AddBook
      	  component: r => require.ensure([], () => r(require('../components/AddBook')), 'add-book')
      	}
      ]	
    },{
      path: '/detail',
      // component: Detail
      component: r => require.ensure([], () => r(require('../components/Detail')), 'detail')
    },{
      path: '*', redirect: '/Home'	
    }
  ],
  mode: 'history'
})

