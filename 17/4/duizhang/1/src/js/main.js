/**
 * [Vue description] 单页面应用spa 组件采用异步加载
 * @type {[type]}
 * @author chencong
 */
import Vue from 'vue';
import Router from 'vue-router';
//默认引入app.vue
import App from 'components/App.vue';
import moment from 'moment';


Vue.use(Router);


//配置路由
const router = new Router();

/**
 * 以下为异步导入vue页面组件
 * 常量必须用 const 声明  且变量名必须为大写
 */
const Index = resolve => require(['components/main/index'], resolve); 
const C_index = resolve => require(['components/main/content/index'],resolve);
const DownLoad = resolve => require(['components/main/content/downLoad'],resolve);
const Package = resolve => require(['components/main/content/package'],resolve);
const UserInfo = resolve => require(['components/main/content/userInfo'],resolve);
const Technology = resolve => require(['components/main/content/technology'],resolve);
const News = resolve => require(['components/main/content/news'],resolve);

/**
 * 路由项
 */
router.map({
	'/index':{
		name:"index",
		title:"首页",
		component:Index,
		subRoutes:{
			'/_index':{
				name:"_index",
				component:C_index
			},
			'/downLoad':{
				name:"downLoad",
				component:DownLoad
			},
			'/package':{
				name:"package",
				component:Package,
				subRoutes:{
					'/news':{
						name:"news",
						component:News
					}
				}
			},
			'/userInfo':{
				name:'userInfo',
				component:UserInfo
			},
			'/technology':{
				name:"technology",
				component:Technology
			}
		}
	}
	
});

router.beforeEach(function(transition){
	window.scrollTo(0, 0);
    let backUrl = transition.to.name;
    console.log(backUrl);
	if(transition.to.islogin){
		if(window.localStorage){
			window.localStorage.member_info ? transition.next() : transition.redirect({name:'register',query:{backUrl: backUrl}});
		}else{
			alert('浏览器不支持localStorage');
		}
	}else{
		transition.next();
	}

});


router.redirect({
	'/':'/index/_index'
});



// Start up our app
router.start(App, 'app');