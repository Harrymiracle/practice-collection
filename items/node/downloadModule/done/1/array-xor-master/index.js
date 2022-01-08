/*!
 * array-xor <https://github.com/jonschlinkert/array-xor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var uniq = require('array-unique');   //数组去重
var diff = require('arr-diff');     //diff(a,b,c…) 数组a中不在b,c中的元素

//此方法的目的是 找出所有 非数组参数共有元素 的一个数组集合
function xor() {
  var len = arguments.length;
  var i = -1, res;

  while (++i < len) {
    var arr = arguments[i];
    //过滤掉xor函数中的非数组参数
    if (Array.isArray(arr)) {
      if (res) {
        //拼接res中不在arr内的数组元素 和 arr中不在res内的数组元素
        res = diff(res, arr).concat(diff(arr, res));
      } else {
        //xor函数的第一个数组参数时
        res = arr;
      }
    }
  }
  //返回前将res去重
  return res ? uniq(res) : [];
}

/**
 * Expose `xor`
 */

module.exports = xor;
