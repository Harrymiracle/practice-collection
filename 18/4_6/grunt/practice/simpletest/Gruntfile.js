module.exports = function(grunt) {
		// 任务配置代码：调用插件配置一下要执行的任务和实现的功能
		grunt.initConfig({
				pkg: grunt.file.readJSON('package.json'),
				uglify: {
						options: { //全局的options
								banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
						},
						build: { //build任务
								src: 'src/<%= pkg.name %>.js',
								dest: './build/<%= pkg.name %>.min.js'  // ./为生成到src的同级目录，去掉 . 生成到了当前盘的第一级目录下
						},
				}

		});

		// 插件加载代码：需要用到的插件加载进来
		grunt.loadNpmTasks('grunt-contrib-uglify');

		// 任务注册代码：注册一个 task，里面包含刚在前面编写的任务配置代码
		// grunt.registerTask('default', ['uglify']);  //本行是配置在默认task上面的,default只是一个别名而已，运行grunt
		grunt.registerTask('compress', ['uglify:build']); //本行配置注册的一个名为compress的task,此任务执行的是uglify下的build任务，运行 grunt compress
}