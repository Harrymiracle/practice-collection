/**
 * Es3中正则表达式字面量始终会共享一个RegExp实例，因此在第一次循环会是true,第二次接着第一次结束的下一位，返回false,
 * 第三次从头来，…true…false……
 * 使用构造函数创建的每一个新的RegExp都是一个新的实例。始终返回true。
 * 下面的例子是用的Es5，在Es5中明确规定两种方式都创建一个新的RegExp,所以都返回true。
 */
var re = null,
    i;
for (i = 0; i < 10; i++) {
    re = /cat/g;
    console.log(re.test('catastrophe')); //10个true
};

for (i = 0; i < 10; i++) {
    re = new RegExp('cat', 'g');
    console.log(re.test('catastrophe')); //10个true
}