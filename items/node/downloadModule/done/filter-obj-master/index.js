'use strict';

module.exports = (object, predicate) => {
	const result = {};
	const isArray = Array.isArray(predicate);

	//对象的entries方法，返回一个包含[[key,value],[key1,value1]……]的数组
	for (const [key, value] of Object.entries(object)) {
		//如果是数组就调用数组的includes方法看当前key值是否在数组中
		//如果不是数组 就调用该cb参数
		//以上两种情况满足条件的就将对于的key-value值增加到result对象中。
		if (isArray ? predicate.includes(key) : predicate(key, value, object)) {
			result[key] = value;
		}
	}

	return result;
};
