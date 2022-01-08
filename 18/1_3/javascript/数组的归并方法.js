/**
 * 参考：http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/#filter
 * https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001435119854495d29b9b3d7028477a96ed74db95032675000
 * https://segmentfault.com/a/1190000010731933
 * 
 * 此为数组的遍历方法之一：
 *运用map方法将数组项映射成字符串
 * ** */
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let result = arr.map(String);
console.log(result); //[ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]



/**
 * 归并方法：  reduce
 * 
 */
//1、求积
let result1 = arr.reduce(function(x, y) {
    return x * y;
}, 1);
console.log(result1); //362880

//2、把arr数组按从前到后的顺序转换成一个数字123456789。
let result3 = arr.reduce(function(lastResult, cur) {
    return lastResult * 10 + cur;
});
console.log(result3); //123456789

/**
 * 3、
 * reduce函数的返回结果类型和传入的初始值相同，以上实例中初始值为number类型，同理，初始值也可为object类型。
 */
let items = [10, 200, 3000];
let result4 = items.reduce(function(curSum, item) { //curSum被初始化为一个对象，item为item遍历的当前项
    curSum.sum = curSum.sum + item;
    return curSum;
}, { sum: 0 });
console.log(result4); //{sum:3210}   为一个对象


/**
 * 4、
 * reduce实现多维叠加：
 * 采用分而治之的方法，即将reduce函数第一个参数callback封装为一个数组，由数组中的每一个函数单独进行叠加并完成reduce操作。
 * 所有的一切通过一个manager函数来管理流程和传递初始参数。
 * manager函数的实现，它需要reducers对象作为参数，并返回一个callback类型的函数，作为reduce的第一个参数。
 * 在该函数内部，则执行多维的叠加工作（Object.keys（））。
 */
var reducers = {
    totalInEuros: function(state, item) {
        return state.euros += item.price * 0.897424392;
    },
    totalInYen: function(state, item) {
        return state.yens += item.price * 113.852;
    }
};

var manageReducers = function(reducers) {
    return function(state, item) { //state的初始值为initialState, item为当前项
        /**
         *Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
         *数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。 
         */
        return Object.keys(reducers).reduce(
            function(nextState, key) { //nextState的初始值为一个空对象，当前值为key
                reducers[key](state, item);
                return state;
            }, {});
    }
};

var bigTotalPriceReducer = manageReducers(reducers);
var initialState = { euros: 0, yens: 0 };
var itemz = [{ price: 10 }, { price: 120 }, { price: 1000 }];
var totals = itemz.reduce(bigTotalPriceReducer, initialState);
console.log(totals); //{ euros: 1014.08956296, yens: 128652.76 }


/**
 * 5、
 * 计算某同学的期末成绩
 */

var scoreResult = [{
    'subject': 'Chinese',
    'score': 90
}, {
    'subject': 'Math',
    'score': 99
}, {
    'subject': 'English',
    'score': 95
}];

//单纯求总成绩
var scoreSum = scoreResult.reduce(function(pre, cur) {
    return pre + cur.score;
}, 0);
console.log(scoreSum); //284

//如若此同学之前有过错，扣分20分
var scoreSum2 = scoreResult.reduce(function(pre, cur) {
    return pre + cur.score;
}, -10);
console.log(scoreSum2); //274

//如若各科按不同比例来算分
var disc = {
    'Chinese': 0.5,
    'Math': 0.3,
    'English': 0.2
};

var scoreSum3 = scoreResult.reduce(function(pre, cur) {
    return pre + cur.score * disc[cur.subject];
}, -10);
console.log(scoreSum3); //83.7


/**
 * 6、
 * 判断一个字母在一个字符串中出现的次数。
 */

var theString = 'asfddsfdsadffg';
var theCount = theString.split('').reduce(function(pre, cur) {
    //如果pre[cur]有值就取到这个值加 1，如果没有这个值就赋值为 1 。
    pre[cur] ? pre[cur]++ : pre[cur] = 1;
    return pre;
}, {}); //初始化为一个空对象
console.log(theCount); //{ a: 2, s: 3, f: 4, d: 4, g: 1 }