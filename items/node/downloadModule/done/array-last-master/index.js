/*!
 * array-last <https://github.com/jonschlinkert/array-last>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

  // https://github.com/Harrymiracle/array-last.git
/*
  有一个问题，当传入的第二个参数大于数组的长度时，前面会出现undefined;
  另一个问题，当第二个参数为负时会抛出错误。
  还有一个问题，第二个参数为1时返回的是一个数组元素，为其他时返回的是一个数组
*/

var isNumber = require('is-number');

module.exports = function last(arr, n) {
  if (!Array.isArray(arr)) {    //第一个参数不是数组抛出错误
    throw new Error('expected the first argument to be an array');
  }

  var len = arr.length;
  if (len === 0) {  //数组长度为 0 返回空
    return null;
  }

  // n = isNumber(n) ? +n : 1;   //如果传入的第二个参数是字符串就用 + 转换成数字，否则默认为 1。
  n = isNumber(n) ? Math.abs(+n) : 1;   //解决第二个问题
  if (n === 1) {      //n为1，返回数组最后一个元素
    return arr[len - 1];
    // return [arr[len - 1]];   //解决第三个问题
  }

  if (n >= len){    //解决第一个问题，如果第二个参数比数组长度长，就返回数组
    return arr;
  }

  var res = new Array(n);   //想截取多长的数组就创建一个多长的空数组，此时的n不能为负
  while (n--) {   //n 先判断再 --
    res[n] = arr[--len];    //arr从后往前取值，res数组从后往前赋值。
  }
  return res;
};
