app.directive('hello', function() {
	return {
		restrict: 'E',
		template: '<div>我是外部加载进来的内容。</div>',
		replace: true
	}
})

