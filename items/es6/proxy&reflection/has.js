// has 陷阱接受两个参数：
// trapTarget 要读取属性的对象（代理的目标）
// key 要检查的属性键（字符串或是Symbol）

let target = {
    name: 'target',
    value: 34
};

let proxy = new Proxy(target, {
    has(trapTarget, key) {
        if(key === 'value') {
            return false;
        }else{
            return Reflect.has(trapTarget, key);
        }
    }
});

// 注意：target 对象上的设置了 has陷阱的属性还是返回的true
console.log('value' in target);     // true
console.log('value' in proxy);     // false

console.log('name' in target);     // true
console.log('name' in proxy);     // true

console.log('toString' in target);     // true
console.log('toString' in proxy);     // true