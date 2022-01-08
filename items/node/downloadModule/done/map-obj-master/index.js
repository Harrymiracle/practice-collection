'use strict';

const isObject = value => typeof value === 'object' && value !== null;

// Customized for this use-case  为这个用例定制的判断是否为对象，只适用于此处的对象定义范围，其他地方不应该用此判断方法。
// typeof检查为 'object'，非null、非正则对象、非错误对象、非日期对象
const isObjectCustom = value =>
	isObject(value) &&
	!(value instanceof RegExp) &&
	!(value instanceof Error) &&
	!(value instanceof Date);

//参数分别为 源对象、处理函数、可选参数、字典存储器参数（默认为WeakMap，此时isSeen用于存储key-value值）
const mapObject = (object, mapper, options, isSeen = new WeakMap()) => {
	options = {			//在options对象中使用对象的展开运算符 加入迭代深度和目标对象
		deep: false,
		target: {},
		...options		//展开运算符
	};

	if (isSeen.has(object)) {		//如果存在目标对象的key值就取出该key对应的value值
		return isSeen.get(object);
	}

	//设置key值为obeject目标对象的WeakMap（key只能是对象）
	isSeen.set(object, options.target);

	const {target} = options;		//使用对象的解构取出对应的target对象
	delete options.target;

	//目标对象是数组时的映射函数
	const mapArray = array => array.map(element => isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);
	if (Array.isArray(object)) {
		return mapArray(object);
	}

	// 用key value 解构Object.entries的返回值
	for (const [key, value] of Object.entries(object)) {
		let [newKey, newValue] = mapper(key, value, object);

		if (options.deep && isObjectCustom(newValue)) {
			newValue = Array.isArray(newValue) ?
				mapArray(newValue) :
				mapObject(newValue, mapper, options, isSeen);
		}

		target[newKey] = newValue;
	}

	return target;
};

module.exports = (object, mapper, options) => {  	//参数分别为 源对象、处理函数、可选参数
	if (!isObject(object)) {
		throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
	}

	return mapObject(object, mapper, options);		//初次调用时没有存储对象，因此没有传入第四个参数
};
