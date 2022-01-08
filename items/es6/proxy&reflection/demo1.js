// 用Proxy构造函数创建代理需要传入两个参数：目标和处理程序。
// 处理程序是定义了一个或是多个陷阱的对象
// 创建一个简单的代理 （无陷阱处理程序相当于简单的转发代理）
let target = {};
let proxy = new Proxy(target, {});      

proxy.name = 'proxy';
console.log(proxy.name);    // proxy
console.log(target.name);   // proxy

target.name = 'target';
console.log(proxy.name);    // target
console.log(target.name);   // target