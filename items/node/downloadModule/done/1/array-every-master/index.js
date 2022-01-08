/*!
 * array-every <https://github.com/jonschlinkert/array-every>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var iterator = require('make-iterator');

module.exports = function every(arr, cb, thisArg) {
  cb = iterator(cb, thisArg);
  var res = true;

  if (arr == null) return res;
  var len = arr.length;
  var i = 0;

  //len控制循环进入条件
  while (len--) {
    //如果数组中有一项执行回调函数为false，就中断并返回false
    //i++移动arr数组的指针
    if (!cb(arr[i++], i, arr)) {
      res = false;
      break;
    }
  }

  return res;
};
