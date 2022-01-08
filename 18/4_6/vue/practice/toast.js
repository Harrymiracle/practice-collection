var Toast = {};

Toast.install = function(Vue, options) {
    Vue.prototype.$msg = '我是测试内容';
};

module.exports = Toast;