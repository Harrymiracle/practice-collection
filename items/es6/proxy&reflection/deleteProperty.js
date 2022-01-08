// deleteProperty 陷阱接受两个参数：
// trapTarget 要删除属性的对象（代理的目标）
// key 要删除的属性键（字符串或是Symbol）

let target = {
    key: 'target',
    value: 34
};

let proxy = new Proxy(target, {
    deleteProperty(trapTarget, key) {
        if(key === 'value') {
            return false;
        }else{
            return Reflect.deleteProperty(trapTarget, key);
        }
    }
});

console.log('key' in target);       // true
console.log('value' in target);     // true
console.log('key' in proxy);        // true
console.log('key' in proxy);        // true

let res2 = delete proxy.value;
console.log(res2);                  // false
console.log('value' in target);     // true
console.log('value' in proxy);      // true
console.log(target);                // { key: 'target', value: 34 }
console.log(proxy);                 // { key: 'target', value: 34 }

// 注意：target 对象上的设置了deleteProperty陷阱的属性可以删除
let res = delete target.value;
console.log(res);                   // true
console.log('value' in target);     // false
console.log('value' in proxy);      // false
console.log(target);                // { key: 'target' }
console.log(proxy);                 // { key: 'target' }