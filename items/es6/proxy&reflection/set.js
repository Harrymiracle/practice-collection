// set 陷阱接受4个参数：
// trapTarget 用于接受属性（代理目标）的对象
// key 要写入属性键（字符串或Symbol类型）
// value 被写入属性的值
// receiver 操作发生的对象（通常是代理）

let target = {
    name: 'target'
};

let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
        if(!trapTarget.hasOwnProperty(key)) {
            if(isNaN(value)) {
                throw new TypeError('属性必须是数字');
            }
        }
        return Reflect.set(trapTarget, key, value, receive);
    }
});

proxy.count = 1;
console.log(proxy.count);   // 1
console.log(target.count);  // 1

proxy.name = 'proxy';
console.log(proxy.name);    // proxy
console.log(target.name);   // proxy

proxy.anotherName = 'anotherName';  // TypeError: 属性必须是数字
