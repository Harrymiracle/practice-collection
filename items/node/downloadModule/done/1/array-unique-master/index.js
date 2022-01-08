/*!
 * array-unique <https://github.com/jonschlinkert/array-unique>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

 /*
  存在的问题:
      方法一，（此种方法并不高效，unique实际上就是个数组去重，参见unique.html）
        问题一、在while条件判断之外存储了数组的长度，当遇到重复的元素在for内使用了splice后数组的长度就变了，此处还是之前的长度。

*/

'use strict';

// 方法一、
//改变原数组的方法
module.exports = function unique(arr) {  
  //参数是否为数组检测
  if (!Array.isArray(arr)) {    
    throw new TypeError('array-unique expects an array.');
  }
  
  //问题一
  var len = arr.length; 
  var i = -1;

  while (i++ < len) {
    var j = i + 1;

    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
};

// 方法二、
//不改变原数组的方法
module.exports.immutable = function uniqueImmutable(arr) {  
  //参数是否为数组检测
  if (!Array.isArray(arr)) {   
    throw new TypeError('array-unique expects an array.');
  }

  var arrLen = arr.length;
  var newArr = new Array(arrLen);

  for (var i = 0; i < arrLen; i++) {
    newArr[i] = arr[i];
  }

  return module.exports(newArr);
};
