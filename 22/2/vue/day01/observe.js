// 视图更新
function updateView() {
    let num = +new Date() + '';
    let n = num.substr(5, 8);
    console.log(`更新了视图, ${n}`);
}

// 重新定义数组原型
const oldArrayProto = Array.prototype;
// 基于oldArrayPro创建一个新的对象，扩展新的方法就不会影响Array.prototype
const arrayProto = Object.create(oldArrayProto);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrayProto[methodName] = function () {
        // 插入想植入的操作，如 更新视图
        updateView();
        // 执行原生方法上有的操作
        oldArrayProto[methodName].call(this, ...arguments);
    }
})

// 劫持对象属性
function defineReactive(target, key, value) {
    // 深度监听data的值
    observer(value);
    // 核心API
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue !== value) {
                // 设置新的值时深度监听
                observer(newValue);
                value = newValue;
                updateView();
            }
        }
    })
}

// 监听对象
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    // 如果是数组
    if (Array.isArray(target)){
        // 重新定义target的隐性属性__proto__
        target.__proto__ = arrayProto;
    }
    // 重新定义各个属性
    for (let key in target) {
        defineReactive(target, key, target[key]);
    }
}

// 数据项 对应Vue中的Model
const data = {
    name: 'Harry',
    age: 20,
    brothers: ['John', 'Tom'],
    info: {
        job: 'farmer',
        hometown: 'cd'
    }
}

// 监听数据
observer(data);

// 测试  对应的模拟View
// data.name = 'Jack';
// data.age = 21;
// data.info.job = 'engineer'; // 监听对象的属性是一个对象
// data.age = {    // 新值是一个对象
//     num: 28
// }
// data.hehe = 'hehe~~'; // 修改的属性没传入最初的observer中（无法监听新增的属性）
// delete data.age; // 删除对象的属性
data.brothers.push('Green');
