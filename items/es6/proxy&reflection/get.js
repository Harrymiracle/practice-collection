// get 陷阱接受3个参数：
// trapTarget 被读取的原对象（代理的目标）
// key 要读取的属性键（字符串或Symbol）
// receiver 操作发生的对象（通常是代理）

let proxy = new Proxy({}, {
    get(trapTarget, key, receiver) {
        if(!(key in receiver)) {
            throw new TypeError('属性 ' + key + ' 不存在');
        }
        return Reflect.get(trapTarget, key, receiver);
    }
});

proxy.name = 'proxy';
console.log(proxy.name);    // proxy

console.log(proxy.nam);     // 属性 nam 不存在