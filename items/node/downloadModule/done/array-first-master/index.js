/*!
 * array-first <https://github.com/jonschlinkert/array-first>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var isNumber = require('is-number');
var slice = require('array-slice');

module.exports = function arrayFirst(arr, num) {
  if (!Array.isArray(arr)) {     //如果第一个参数不是数组，抛出错误
    throw new Error('array-first expects an array as the first argument.');
  }

  if (arr.length === 0) {     //数组长度为 0，返回空
    return null;
  }

  //slice截取传入slice的第一参数（数组）中，从传入slice的第二个参数开始，到传入的第三个参数结束位置的数组项。
  //isNumber检查传入的参数是不是数字。如果是就在传入的参数前加上+，能让数组字符串转换成数字；如果不是默认为1。
  //传入的参数为1，或是显示传入null，或者不传就取first数组的第一个；否则返回first数组。
  var first = slice(arr, 0, isNumber(num) ? +num : 1);  
  //如果num变量为字符串，在前面加上+可以将num转换成数字;
  //另外，此处的num==null既可以判断num显示的传入null，又可以判断根本未传入该参数。
  if (+num === 1 || num == null) {    //可以把这个判断提到声明first之前
    return first[0];
  }
  return first;
};
