var Toast = {};
var showToast = false;//存储toast的状态

Toast.install = function(Vue, options) {
	Vue.prototype.$toast = (tips) => {
		let toastTpl = Vue.extend({ // 1、创建构造器，定义好提示信息的模板
			data(){
				return {
					show:showToast
				}
			},
			template: '<div v-show="show" class="vue-toast">' + tips + '</div>'
		});
		var vm = new toastTpl();//创建一个实例
		var tpl = vm.$mounted().$el;//挂载实例

		document.body.appendChild(tpl); // 使用原生DOM API把它插入文档中
		vm.show = showToast = true;//显示该元素

		setTimeout(function () {        //延迟2.5秒后隐藏该元素
            vm.show = showToast = false;
        }, 2500);
	}
    Vue.prototype.$msg = '我是测试内容';
};

module.exports = Toast;