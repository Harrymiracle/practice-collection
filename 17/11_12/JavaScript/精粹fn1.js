//1、使用ES6方法实现排序去重
let arr = [10, 20, 8, 9, 3, 2, 1, 2, 2, 2, 8];
let s = [...new Set(arr)]; //去重
console.log(s);
let ss = s.sort(function(a, b) { //用sort函数排序
    return b - a;
});
console.log(ss);


//2、检索对象：检索一个undefined的值会导致TypeError异常
var flight = {
    status: 0
}
console.log(flight.equipment); //undefined
//console.log(flight.equipment.NO); //TypeError: Cannot read property 'NO' of undefined
// 可以用如下方法避免错误发生
if (flight.equipment && flight.equipment.NO) {
    console.log(flight.equipment.NO);
} else {
    console.log('Not existed!');
}

/***
 * 3、
 *  
 * 函数调用的四种调用模式：
 * 1、方法调用；
 *    (调用表达式包含一个属性存取表达式，即一个 . 表达式或是一个 [] 下标表达式，它被当做一个方法来调用，若此函数被保存为一个对象的方法，
 *     ，那么调用时的this对象被绑定到该对象上。)
 * 2、函数式调用；
 * 3、构造函数式调用；
 * 4、apply调用；
 * 
 * ***/

//a、方法调用例子
var myObj = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}
myObj.increment(); //1
console.log(myObj.value);
myObj.increment(5);
console.log(myObj.value); //6


//b、测试当用函数调用法调用函数时传递的实参多余形参时，函数的arguments对象的值是什么
var sum = function(a, b) {
    console.log(arguments); //1, 3, 4, 6, 7, 8, 12
    var sum = 0, //sum需要赋值一个初始数字值，否则会为NaN
        i;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
var rs = sum(1, 3, 4, 6, 7, 8, 12);
console.log(rs);


//c、函数式调用时，this被绑定到全局对象上，解决方法；
myObj.double = function() {
    var that = this; //用一个临时变量存储此处的this对象
    var helper = function() {
        that.value = sum(that.value, that.value);
    }
    helper(); //函数式调用
}
myObj.double(); //以方法的形式调用
console.log(myObj.value); //12


//d、 apply(被绑定给this的值，参数数组) 调用。
var arr_2 = [1, 3, 5, 7, 9];
var result = sum.apply(null, arr_2);
console.log(result); //25

var statusObj = {
    status: 22
}

// statusObj并没有sum方法，可以用apply方法调用
var result22 = sum.apply(statusObj, [2, 4, 6, 8]);
console.log(result22); //20


//4、给类型增加方法
//给Function.prototype增加一个名为method方法,该方法指向一个匿名函数，
if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function(name, implementation) {
        //this指向调用method的对象，给该对象的原型上增加名为name的方法
        this.prototype[name] = implementation;
        return this;
    };
}

//给Number对象增加一个取整的方法
Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
})
console.log((-10 / 3).integer()); //-3

//给String对象增加一个去除首位空格的方法
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
})
console.log('  woshi ceshi de neirong!   '); //  woshi ceshi de neirong!   
console.log('  woshi ceshi de neirong!   '.trim()); //woshi ceshi de neirong!

//5、闭包：
// a、我们将调用匿名函数的结果赋值给myObj对象，其包含两个方法。这些放过有权继续访问value变量
var myObj2 = function() {
    var value = 0;
    return {
        incremetn: function(inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function() {
            return value;
        }
    }
}();



/***b、将匿名函数赋值给quo，该函数包含一个status私有属性和一个get_status方法
 * 
 *构造一个quo的实例，一个包含get_status方法的新对象，此时的quo函数已经返回了，但是get_status方法仍有权访问status属性，
 *此时不是访问的status的拷贝，而是访问的该参数本身，因为闭包，函数可以访问创建时的上下文环境。
 *
 ***/
var quo = function(status) {
    return {
        get_status: function() {
            return status;
        }
    }
}
var myQuo = quo('amazed!');
console.log(myQuo.get_status()); //amazed!