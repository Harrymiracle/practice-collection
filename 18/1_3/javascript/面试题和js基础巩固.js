//1、arguments是一个Array-like对象，对应的就是传入函数的参数列表。你可以在任何函数中直接使用该变量。
(function() {
    console.log(typeof arguments);
})() //object



//2、
var f = function fn() {
    return 123;
}; //这是一个函数表达式。f 可以被重新赋值，函数名fn不能改变，fn只能在函数体内部使用，在函数体外使用会报错。
// fn();//ReferenceError: fn is not defined



//3、
(function(x) {
    delete x;
    console.log(x); //1
    return x;
})(1);
/**
 * delete操作符可以从对象中删除属性，正确用法如下：
 *       delete object.property   
 *       delete object['property']
 *       object为对象的名称或计算结果为对象的表达式。property要删除的属性。
 *       对于所有情况都是true，除非属性是一个自己的不可配置属性，在这种情况下，非严格模式返回 false。
 *       在严格模式下，如果是对象自身的不可配置属性，会抛出Global_objects/SyntaxError。
 *    delete操作符只能作用在对象的属性上，对变量和函数名无效。
 *    也就是说delete x是没有意义的。delete是不会直接释放内存的，她只是间接的中断对象引用。
 */



//4、
var x = 1,
    y = x = typeof y; //typeof y = undefined;(从右到左y未申明)
console.log(y); //undefined



//5、
(function f(f) { //此处参数f为函数function() { return 1; }
    return typeof f(); //"number"   传入的参数执行后得到数字 1，数字 1 的类型为number
})(function() { return 1; });



//6、
var foo = {
    bar: function() {
        console.log(this, this.baz); //这行为我自己加的
        return this.baz;
    },
    baz: 1
};

(function() {
    console.log(arguments[0]); //[Function: bar]
    return typeof arguments[0](); //{ '0': [Function: bar] } undefined
})(foo.bar);
/**
 * 向函数中传递参数可以看作是一种赋值，所以arguments[0]得到是是真正的bar函数的值，而不是foo.bar这个引用，
 * 那么自然this也就不会指向foo，而是window了。
 * { '0': [Function: bar] } 从这个对象可以看出arguments对象就是一个类数组对象，对象的键是0,1,2……，
 * console的第一个this是指bar这个函数本身，函数中没有baz属性。
 */



//7、
var foo = {
    bar: function() { return this.baz; },
    baz: 1
}
typeof(f = foo.bar)(); //"undefined"   同上



//8、
var f = ( //逗号操作符 对它的每个操作对象求值（从左至右），然后返回最后一个操作对象的值。
    function f() { return '1'; },
    function g() { return 2; } //最终返回 2
)();
typeof f; //"number"



//9、
var x = 1;
if (function ff() {}) {
    x += typeof ff;
}
console.log(x); //"1undefined"    在ff函数外部调用ff无用



//10、
var x = [typeof x, typeof y][1];
typeof typeof x; //"string"
/**
 * 因为没有声明过变量y，所以typeof y返回"undefined"
 * 将typeof y的结果赋值给x，也就是说x现在是"undefined"
 * 然后typeof x当然是"string"
 * 最后typeof "string"的结果自然还是"string"
 */



//11、
(function f() {
    function f() { console.log(1); return 1; }
    return f(); //2
    function f() { console.log(2); return 2; } //存在变量提升
})();



//12、
function fff() { return fff; }
var resultInstance = new fff() instanceof fff;
console.log(resultInstance); //false
/**
 * 当代码new f()执行时，下面事情将会发生：
 *      1、一个新对象被创建。它继承自fff.prototype。
 *      2、构造函数fff被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new fff等同于new fff()，只能用在不传递任何参数的情况。
 *      3、如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。
 *   ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。
 *      我们这里的new fff()返回的仍然是函数f本身，而并非他的实例。
 */