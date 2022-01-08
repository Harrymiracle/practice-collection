'use strict';
module.exports = function (item, n) {
	var ret = new Array(n);
	var isFn = typeof item === 'function';

	//如果item不是一个生成函数，且有数组的fill方法
	if (!isFn && typeof ret.fill === 'function') {
		return ret.fill(item);
	}

	for (var i = 0; i < n; i++) {
		ret[i] = isFn ? item(i, n, ret) : item;
	}

	return ret;
};
