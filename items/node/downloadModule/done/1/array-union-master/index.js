'use strict';
var arrayUniq = require('array-uniq');

module.exports = function () {
	return arrayUniq([].concat.apply([], arguments));  	//arguments为类数组，需要调用apply方法
};
