/**
 * 函数两个内部属性，1、arguments（有一个callee属性，指向拥有这个arguments对象的函数。）; 2、this;  
 *                 注：caller是函数对象的属性，它保存了调用当前函数的函数的引用。
 * 
 * 平时写的阶乘函数：
 */
//一、arguments
function factorial(n) {
    if (n <= 1) {
        return 1;
    } else if (n > 1) {
        return n * factorial(n - 1);
    }
}
console.log(factorial(1)); //1
console.log(factorial(5)); //120
console.log(factorial(170)); //7.257415615307994e+306   为node环境下能算的最大数，n===171是即为infinit。

//暴露上面方法的问题
var trueFactorial = factorial;
factorial = function() {
    return 0;
}
console.log(trueFactorial(5)); //0
/**
 * 原因分析，此时调用trueFactorial函数时，内部会用到factorial函数，而在上面一行已经将factorial变量重新赋值为一个返回0的函数。
 * 从这例子也可以看出，函数名只是一个栈内存中指向函数在堆内存中地址的指针，可以在后续给函数名指向一个其他的地址。
 */



/**
 * 利用arguments.callee解耦函数的执行同函数名的关系
 */
function factorial2(n) {
    if (n <= 1) {
        return 1;
    } else if (n > 1) {
        return n * arguments.callee(n - 1); //arguments.callee是一个指针，指向拥有这个arguments对象的函数。
    }
}
console.log(factorial2(1)); //1
console.log(factorial2(5)); //120

var trueFactorial2 = factorial2;
factorial2 = function() {
    return 0;
}
console.log(trueFactorial2(5)); //120
/**
 * arguments.callee是一个指针，指向拥有这个arguments对象的函数。上面在调用trueFactorial2的时候，实际是指向堆中最初factorial2的内存地址的。
 */



//二、this
function showColor() {
    console.log(this.color);
}
global.color = 'red'; //在node环境中运行的，全局对象是global,如若是在浏览器环境中，全局对象即是 window
var o = {
    color: 'blue'
}
showColor(); //red
o.showColor = showColor;
o.showColor(); //blue
showColor.call(o); //blue  在 o 的环境中调用showColor
showColor.apply(o); //blue  在 o 的环境中调用showColor
var objShowColor = showColor.bind(o); //将this的值绑定到bind()函数的参数上
objShowColor(); //blue

showColor = function() { //showColor指向另一个地址
    console.log("I'm changed!");
}
showColor(); //I'm changed!
showColor.call(o); //I'm changed!

/**
 * 注： 函数的名字只是一个包含指针的变量而已，即使在不同的环境中执行，全局的showColor()和o.showColor()指向的仍是同一个函数。
 * 因此这个showColor变量指向的堆中的地址变了，值也变了。
 */