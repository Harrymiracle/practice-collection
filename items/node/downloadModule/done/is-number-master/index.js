/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function(num) {
   //参数类型是number，排除是NaN和Infinity的情况,这两种返回false
  if (typeof num === 'number') {
    return num - num === 0;
  }

  //有Number.isFinite（检测传入的参数是否是一个有穷数）就使用该方法。
  if (typeof num === 'string' && num.trim() !== '') { //是字符串且非空
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num); //有isFinite方法就调用此方法
  }

  return false;
};
