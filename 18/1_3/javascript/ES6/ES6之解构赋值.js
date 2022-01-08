/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment  解构赋值
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator  扩展运算符
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters  剩余操作符
 */


//1、解构赋值（解构赋值语法是一个 Javascript 表达式，这使得可以将 值从数组 或 属性从对象 提取到不同的变量中。）
/**
 * 
 * ---解构数组
 * 
 */

//变量声明并赋值时的解构
var arr1 = ['one', 'two', 'three'];
var [a, b, c] = arr1;
console.log(a, b, c); //one two three

//变量先声明后赋值时的解构。    通过解构分离变量的声明，可以为一个变量赋值。
var aa, bb;
[aa, bb] = [1, 2];
console.log(aa, bb); //1 2

//默认值。  为了防止从数组中取出一个值为undefined的对象，可以为这个对象设置默认值。
var [cc = 5, dd, ee = 6] = [3, 4];
console.log(cc, dd, ee); //3 4 6

//交换变量。     在一个解构表达式中可以交换两个变量的值。
var fff = 9,
    eee = 8;
console.log(fff, eee); //9 8 
[fff, eee] = [eee, fff];
console.log(fff, eee); //8 9 

//解析一个从函数返回的数组。    从一个函数返回一个数组是十分常见的情况.。解构使得处理返回值为数组时更加方便。
function f() {
    return [11, 22];
}
var xx, yy;
[xx, yy] = f();
console.log(xx, yy); //11 22

//忽略某些返回值。
function fns() {
    return [33, 44, 55, 66];
}
var [zz, , vv, uu] = fns();
console.log(zz, vv, uu); //33 55 66


//将剩余数组赋值给一个变量。  当解构一个数组时，可以使用剩余模式，将数组剩余部分赋值给一个变量。注意：如果剩余元素右侧有一个逗号，会抛出SyntaxError，因为剩余元素必须是数组的最后一个元素。
var [td, td1, ...td2] = [5, 6, 7, 8, 9, 10];
console.log(td, td1, td2); //5 6 [ 7, 8, 9, 10 ]

//用正则表达式匹配提取值。  
//    用正则表达式方法exec()匹配字符串会返回一个数组，该数组第一个值是完全匹配正则表达式的字符串，然后的值是匹配正则表达式括号内内容部分。
//    解构赋值允许你轻易地提取出需要的部分，忽略完全匹配的字符串——如果不需要的话。
var URL = 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    PATTERN = /^(\w+)\:\/\/([^\/]+)\/(.*)$/,
    urlRes = PATTERN.exec(URL);
var [totalMatch, protocol, fullhost, fullpath] = urlRes;
console.log(totalMatch, protocol, fullhost, fullpath);
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// https
// developer.mozilla.org 
// zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

/**
 * 
 * ---解构对象
 * 
 */

//基本赋值
var o = { p: 34, q: 61 };
var { p, q } = o;
console.log(p, q); //34 61

//无声明赋值。    通过解构可以无需声明来赋值一个变量。
//  赋值语句周围的( .. ) 是使用对象字面解构赋值时不需要声明的语法。{a, b} = {a: 1, b: 2}不是有效的独立语法，
//  因为左边的{a, b}被认为是一个块而不是对象字面量。然而，({a, b} = {a: 1, b: 2})是有效的，正如 var {a, b} = {a: 1, b: 2}
//  注意：     你的( .. ) 表达式需要一个分号在它前面，否则它也许会被当成上一行中的函数来执行。
var ao, bo;
({ ao, bo } = { ao: 1, bo: 2 });
console.log(ao, bo); //1 2

//给新的变量名赋值。 可以从一个对象中提取变量并赋值给和对象属性名不同的新的变量名。
var o2 = { po: 'yes', qo: true };
var { po: jo, qo: fo } = o2;
console.log(jo, fo); // yes true
// console.log(po, qo); //ReferenceError: po is not defined

//默认值。      变量可以先赋予默认值。当要提取的对象没有对应的属性，变量就被赋予默认值。
var { ao3 = 6, bo3 = 8 } = { ao3: 66 };
console.log(ao3, bo3); //66 8

//给新的变量命名并提供默认值。    一个属性可以是1）从一个对象解构，并分配给一个不同名称的变量，2）分配一个默认值，以防未解构的值是undefined。
var { ao4: jo4 = 8, bo4: fo4 = 9 } = { bo4: true };
console.log(jo4, fo4); //8 true


//函数参数默认值
//  (ES5版本
function drawEs5Chart(option) {
    option = option === undefined ? {} : option;
    var size = option.size === undefined ? 'big' : option.size;
    var cords = option.cords === undefined ? { x: 0, y: 0 } : option.cords;
    var radius = option.radius === undefined ? 25 : option.radius;
    console.log(size, cords, radius);
}
drawEs5Chart({ cords: { x: 18, y: 30 }, radius: 30 }); //big { x: 18, y: 30 } 30
drawEs5Chart({}); //big { x: 0, y: 0 } 25
drawEs5Chart(); //big { x: 0, y: 0 } 25
//  (Es6版本
function drawEs6Chart({ size = 'big', cords = { x: 0, y: 0 }, radius = 25 } = {}) {
    console.log(size, cords, radius);
}
drawEs6Chart({ cords: { x: 18, y: 30 }, radius: 30 }); //big { x: 18, y: 30 } 30
drawEs6Chart({}); //big { x: 0, y: 0 } 25
drawEs6Chart(); //big { x: 0, y: 0 } 25  //在参数定义中如果不写右边的={}，在调用时会报  TypeError: Cannot match against 'undefined' or 'null'.
//在上面的drawEs6Chart的函数签名中，解构的左手边被分配给右手边的空对象字面值：{size = 'big', cords = {x: 0, y: 0}, radius = 25} = {}。
//你也可以在没有右侧分配的情况下编写函数。但是，如果你忽略了右边的赋值，那么函数会在被调用的时候查找至少一个被提供的参数，
//而在当前的形式下，你可以直接调用drawES2015Chart()而不提供任何参数。如果你希望能够在不提供任何参数的情况下调用该函数，则当前的设计非常有用，
//而另一种方法在您确保将对象传递给函数时非常有用。


//解构嵌套对象和数组。
var metadata = {
    title: "pretty boy",
    translations: [{
        locale: "de",
        localization_tags: [],
        last_edit: "2014-04-14T08:43:37",
        url: "/de/docs/Tools/Scratchpad",
        title: "美男子"
    }],
    url: "/en-US/docs/Tools/Scratchpad"
};
var { title: englishTitle, translations: [{ title: locationTitle }] } = metadata;
console.log(englishTitle, locationTitle); //pretty boy   美男子

//For of 迭代和解构  (可以用于解构json数据)
var people = [{
        name: "Mike Smith",
        family: {
            mother: "Jane Smith",
            father: "Harry Smith",
            sister: "Samantha Smith"
        },
        age: 35
    },
    {
        name: "Tom Jones",
        family: {
            mother: "Norah Jones",
            father: "Richard Jones",
            brother: "Howard Jones"
        },
        age: 25
    }
];
for (var { name: n, family: { mother: m, father: f }, age: a }
    of people) {
    console.log('name:' + n + '; father:' + f + '; mother:' + m + ';');
}
//name:Mike Smith; father:Harry Smith; mother:Jane Smith;
//name:Tom Jones; father:Richard Jones; mother:Norah Jones;

//从作为函数实参的对象中提取数据
function userId({ id }) {
    return id;
}

function whois({ displayName: displayName, fullName: { firstName: name } }) {
    console.log(displayName + ' is:' + name);
}
var user = {
    id: 16,
    displayName: 'jdoe',
    fullName: {
        firstName: 'John',
        lastName: 'Doe'
    }
};
console.log('userId:' + userId(user)); //userId:16
whois(user); //jdoe is:John

//对象属性计算名和解构。   
var key = 'zn';
var {
    [key]: foo
} = {
    zn: true
};
console.log(foo); //true






//2、扩展运算符  允许一个表达式在期望多个参数（用于函数调用）或多个元素（用于数组字面量）或多个变量（用于解构赋值）的位置扩展。

//用于数组字面量:
const [...iterableObj] = [1, 3, 5, 7, 9];
console.log(...iterableObj, 0, 2, 4, 6, 8); //1 3 5 7 9 0 2 4 6 8
console.log(...iterableObj, '|', ...iterableObj); //1 3 5 7 9 '|' 1 3 5 7 9

//更好于 apply 的方法
//  (Es5的写法
function myFunction(x, y, z) {
    console.log(x, y, z);
}
var args = [1, 2, 3];
myFunction.apply(null, args); //1 2 3
//  (Es6的写法
myFunction(...args); //1 2 3

//更强大的数组字面量
//  使用Es5如果已经有一个数组，此时还需要再新建一个数组，要求新数组包含已有数组的数组项的话，就要用到push，splice，concat 等数组方法。
//  有了扩展运算符会让代码更简洁。
//  像扩展参数列表一样，...可以在数组字面量中的任何地方使用，可以多次使用。
let parts = ['shoulder', 'knees'];
let Tshirts = ['Lee', 'Nike'];
let lyrics = ['head', ...parts, 'and', 'toes'];
console.log(lyrics); // ["head", "shoulder", "knees", "and", "toes"]
let lyrics2 = ['head', ...parts, 'and', 'toes', ...Tshirts];
console.log(lyrics2); // ["head", "shoulder", "knees", "and", "toes", "Lee", "Nike"]

//配合new运算符  在ES5中,我们无法同时使用 new 运算符和 apply 方法(apply方法调用[[Call]]而不是[[Construct]])。在ES6中，我们可以使用扩展运算符，和普通的函数调用一样。
let dateFields = [2018, 1, 8];
console.log(new Date(...dateFields)); //2018-02-07T16:00:00.000Z   东八区需要减去8小时
console.log(new Date(2018, 1, 8)); //2018-02-07T16:00:00.000Z   浏览器上打印为  Thu Feb 08 2018 00:00:00 GMT+0800 (中国标准时间)

//赋值数组 拼接数组  见 ES6的7个实用技巧.html 

//另外可以将类数组的对象转换成数组 
// var divs = document.getElementsByTagName('div');
// var divsArr = [...divs];






//3、剩余操作符（rest操作符即...操作符）  允许我们将一个不定数量的参数表示为一个数组。
//  function(a, b, ...theArgs) {}
//  如果函数的最后一个命名参数以...为前缀，则它将成为一个数组，其中从0（包括）到theArgs.length（排除）的元素由传递给函数的实际参数提供。

//剩余参数和 arguments对象的区别
/**
 * 剩余参数和 arguments对象之间的区别主要有三个：
 * 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
 * arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
 * arguments对象还有一些附加的属性 （如callee属性）。
 */

//解构剩余参数。  剩余参数可以被解构，这意味着他们的数据可以被解包到不同的变量中。
function bee(a, b, c) {
    console.log(a + b + c);
}
bee(1); //NaN   1+'undefined'+'undefined'
bee(1, 2, 3); //6
bee(1, 2, 3, 4); //6


//  ---示例


function bee2(...theArgs) {
    console.log(theArgs.length); //由于theArgs是一个数组，因此可以调用它的length属性。
}
bee2('true'); //1
bee2(3, 6, 9); //3

function multiply(multiplier, ...theArgs) {
    return theArgs.map(item => multiplier * item); //返回第一个参数同它后面参数的乘积组成的数组。
}
var bee2Res = multiply(10, 8, 2, 6, 4);
console.log(bee2Res); //[ 80, 20, 60, 40 ]
function sortResFn(...theArgs) {
    return theArgs.sort(); //由于theArgs是一个数组，因此可以调用它的sort方法。
}
console.log(sortResFn(...bee2Res)); //[ 20, 40, 60, 80 ]

//Es5中要达到同样的效果的做法
function sortResFn_ES5() {
    var args = Array.prototype.slice.call(arguments);
    var sortedRes = args.sort();
    return sortedRes;
}
console.log(sortResFn_ES5(5, 3, 7, 1)); //[ 1, 3, 5, 7 ]