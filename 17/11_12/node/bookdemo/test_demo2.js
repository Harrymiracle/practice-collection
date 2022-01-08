var a = 0;

function init() {
    a = 1;
}

function incr() {
    var a = a + 1;
}

init();
console.log('a before: %d', a);
incr();
console.log('a after: %d', a);

/***
 * 
 * 此例子是一个有错误的例子，目的是学习怎么用node的内置调试器：
 * 1、打开控制台，输入node debug test_demo2.js，启动node和调试器；
 * 2、输入help查看提示信息中的所有指令；
 * 3、执行next（下一条指令）继续执行程序，此指令会在同一作用域中的下一条指令处中断执行；
 * 4、执行step，进入init函数调用中；
 * 5、可以执行backtrace查看调用堆栈的情况；
 * 6、输入watch('a')回车，再键入watchers来对一个变量进行监视；
 * 7、执行next；
 * 8、现在准备从init函数的结尾处返回，可以用out指令跳至父作用域的下一指令处，或者——因为已经到达了当前作用域的结尾处——可以使用next指令；
 * 9、想要跳过12行直接进入incr函数调用执行中,要在test_demo2.js的第八行处设置一个断点，用sb('test_deom2.js',8)，可以看到第八行处已经设置了断点；
 * 10、键入cont迅速前进至断点处；可以看到
 *   < a before: 1
 *   break in E:\练习收集\11月-17\node\bookdemo\test_demo2.js:8
 *   Watchers:
 *   0: a = undefined
 * 可知，在第八句之前a等于1，第八句 var 重新申明了局部的 a ，覆盖了前面的 a； 可以用ctrl+D快速退出调速器，删除第八行的var。
 * 
 * ***/