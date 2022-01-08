/*!
 * array-slice <https://github.com/jonschlinkert/array-slice>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function slice(arr, start, end) {
  var len = arr.length;
  var range = [];

  start = idx(len, start);
  end = idx(len, end, len);

  while (start < end) {
    range.push(arr[start++]);   //++ 妙用，从前往后取arr的值追加到range数组中
  }
  return range;
};

function idx(len, pos, end) { //数组的长度始终是要传的
  if (pos == null) {    //可判断未传参和null
    pos = end || 0;     //传了end参数就是end参数，没传就是0（从第一个开始）
  } else if (pos < 0) { //传入的start和end参数有小于0时，判断是否从后至前，以致从前超出数组边界
    pos = Math.max(len + pos, 0);
  } else {              //防止从后超出数组边界
    pos = Math.min(pos, len);
  }

  return pos;
}
