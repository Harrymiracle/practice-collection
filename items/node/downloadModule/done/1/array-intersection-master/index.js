/*!
 * array-intersection <https://github.com/jonschlinkert/array-intersection>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

var filter = require('filter-array');
var every = require('array-every');
var unique = require('array-unique');
var slice = require('array-slice');
var indexOf = require('index-of');

//intersection函数返回参数数组中都存在的元素
//arr为一个显示参数，类数组对象arguments对象的第一元素
module.exports = function intersection(arr) {
  if (arr == null) {
    return [];
  }

  if (arguments.length === 1) {
    return unique(arr);
  }

  //intersection函数的匿名参数
  var arrays = slice(arguments, 1);

  //先对arr参数去重再过滤
  return filter(unique(arr), function (ele) {
    //在arrays数组中的每一个项中执行回调都成功
    return every(arrays, function (cur) {
      //当前数组中有arr数组的元素
      return indexOf(cur, ele) !== -1;
    });
  });
};
