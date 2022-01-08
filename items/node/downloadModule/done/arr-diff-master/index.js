/*!
 * arr-diff <https://github.com/jonschlinkert/arr-diff>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

//参数arr是一个显示参数，为传入diff函数的第一个参数
module.exports = function diff(arr/*, arrays*/) {
  //diff函数参数的个数
  var len = arguments.length;
  //初始化为0，下面将形参初始数组值同arguments对象的第二个值开始，逐个比较
  var idx = 0;
  while (++idx < len) {
    //将每次调用diffArray的值重新赋值给arr
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
};

function diffArray(one, two) {
  //如果形参two不是数组，返回形参one
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var tlen = two.length
  var olen = one.length;
  var idx = -1;
  var arr = [];

  //以one数组的每个元素为对比基数，逐个比较two数组的元素，把不在two数组中的one数组的元素加入arr中，最后返回
  while (++idx < olen) {
    var ele = one[idx];

    //flag值默认one中的当前元素不在two中
    var hasEle = false;
    for (var i = 0; i < tlen; i++) {
      var val = two[i];
      //one中的当前元素在two中，break本轮循环
      if (ele === val) {
        hasEle = true;
        break;
      }
    }
    //本轮循环结束，one中的当前元素不在two中
    if (hasEle === false) {
      arr.push(ele);
    }
  }
  return arr;
}
