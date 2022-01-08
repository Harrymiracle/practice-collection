//路由配置
import App from '../App'

export default [{
    path: '/',      //以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。  
    component: App,     //把App组件作为默认页  
    children: [
      {        //嵌套子路由
          path: '',       //匹配一个空的路径渲染 home 组件
          /***组件按组分块: 
            有时候我们想把某个路由下的所有组件都打包在同个异步 chunk 中。
            只需要 给 chunk 命名，提供 require.ensure 第三个参数作为 chunk 的名称.
            Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面 —— 这也意味着我们无须明确列出 require.ensure 的依赖
            （传空数组就行）。
            ***/
            // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point（代码分块） 
          component: r => require.ensure([], () => r(require('../page/home')), 'home')
      }, {
          path: '/item',
          component: r => require.ensure([], () => r(require('../page/item')), 'item')
      }, {
          path: '/score',
          component: r => require.ensure([], () => r(require('../page/score')), 'score')
      }
    ]
}]

