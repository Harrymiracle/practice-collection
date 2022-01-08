/*!
 * arr-map <https://github.com/jonschlinkert/arr-map>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var iterator = require('make-iterator');

//参数fn的参数格式为(el,i,arr)
module.exports = function map(arr, fn, thisArg) {
  //arr为空返回空数组
  if (arr == null) return [];
  //fn参数支持正则表达式等
  fn = iterator(fn, thisArg);

  var len = arr.length;
  var res = new Array(len);

  for (var i = 0; i < len; i++) {
    res[i] = fn(arr[i], i, arr);
  }
  return res;
};
