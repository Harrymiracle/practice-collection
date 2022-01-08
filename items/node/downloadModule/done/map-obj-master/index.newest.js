'use strict';

// customized for this use-case
// typeof检查为 'object'，非null、非正则对象、非错误对象、非日期对象
const isObject = x =>
	typeof x === 'object' &&
	x !== null &&
	!(x instanceof RegExp) &&
	!(x instanceof Error) &&
	!(x instanceof Date);

module.exports = function mapObj(obj, fn, opts, seen) {
	//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
	opts = Object.assign({
		deep: false,
		target: {}
	}, opts);

	seen = seen || new WeakMap();

	if (seen.has(obj)) {	//如果存在目标对象的key值就取出该key对应的value值
		return seen.get(obj);
	}

	//设置key值为obj目标对象的WeakMap（key只能是对象）
	seen.set(obj, opts.target);

	const target = opts.target;
	delete opts.target;

	for (const key of Object.keys(obj)) {
		const val = obj[key];
		const res = fn(key, val, obj);
		let newVal = res[1];

		if (opts.deep && isObject(newVal)) {
			if (Array.isArray(newVal)) {
				newVal = newVal.map(x => isObject(x) ? mapObj(x, fn, opts, seen) : x);
			} else {
				newVal = mapObj(newVal, fn, opts, seen);
			}
		}

		target[res[0]] = newVal;
	}

	return target;
};