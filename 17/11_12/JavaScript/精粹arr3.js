/***
 * 数组
 * 
 * ** */

//检测一个对象是不是数组
var is_array = function(val) {
    return val && //有val存在
        typeof val === 'object' && //val是对象
        typeof val.length === 'number' && //val有length属性
        typeof val.slice === 'function' && //val的slice方法是一个函数
        !(val.propertyIsEnumerable('length')); //val的length属性不可遍历，另外后面是enumerable,不是enumberable
}

var arr = [];
console.log(is_array(arr)); //true
var obj = {};
console.log(is_array(obj)); //false


if (typeof Function.prototype.method !== 'function') {
    Function.prototype.method = function(name, implementation) {
        this.prototype[name] = implementation;
        return this;
    }
}

Array.method('reduce', function(f, val) {
    var i;
    for (i = 0; i < this.length; i++) {
        val = f(this[i], val);
    }
    return val;
});

var data = [2, 3, 5, 7, 9];
var add = function(a, b) {
    return a + b;
};
var mult = function(a, b) {
    return a * b;
}

var result1 = data.reduce(add, 0);
console.log(result1); //26
var result2 = data.reduce(mult, 1);
console.log(result2); //1890