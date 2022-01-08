// 前瞻匹配 exp1(?=exp2)，查找exp2前面的exp1
// 随便打了一串字符串
let str = '123sertersdTYgfgbh45t6343Dfdgbgdfher345#$%FTGH4t34dfg34t56G8rtuy56fgbT6dfy58845er';
// 查找大小写字母前面的3-5位的数字并替换为 -$-
let res = str.replace(/\d{3,5}(?=[a-zA-Z])/g, '-$-');
console.log(str);
console.log(res);

// 负前瞻匹配 exp1(?!exp2)，查找后面不为exp2的exp1
// 查找后面不为字母的3-5位的数字并替换为 -$-
let res_ = str.replace(/\d{3,5}(?![a-zA-Z])/g, '-$-');
console.log(str);
console.log(res_);

// 后顾匹配 (?<=exp1)exp2 查找exp1后面的exp2
// 查找3-5位的数字后面的连续字母并替换为 -$-
let res_b = str.replace(/(?<=\d{3,5})[a-zA-Z]+/g, '-$-');
console.log(str);
console.log(res_b);

// 负后顾匹配 (?<!exp1)exp2 查找前面不是exp1的exp2
// 查找前面不是3-5位的数字的连续字母并替换为 -$-
let res_nb = str.replace(/(?<!\d{3,5})[a-zA-Z]+/g, '-$-');
console.log(str);
console.log(res_nb);

// 捕获分组 ( )
// 在本例中，我们将把第一个捕获分组和第二个捕获分组的内容交换， "Doe, John" 转换为 "John Doe"：
let n = "Doe   ,  John";
let nn = n.replace(/(\w+)\s*,\s*(\w+)/, "$2 $1");
console.log(nn);

// 改为非捕获分组
let nbn = n.replace(/(\w+)\s*,\s*(?:\w+)/, "$2 $1");
console.log(nbn);

// 千位分割符的例子
let q = "1234567890".replace(/\B(?=(?:\d{3})+(?!\d))/g,",");
console.log(q);