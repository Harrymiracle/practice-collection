
/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

module.exports = function (arr, fn, self) {
  //如果原生支持[].filter 则用原生的方法
  if (arr.filter) return arr.filter(fn, self);
  //在js中undefined为非保留字，可以作为变量名被赋值，void 0 可创建一个真正的undefined
  if (void 0 === arr || null === arr) throw new TypeError;
  if ('function' != typeof fn) throw new TypeError;
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

//返回一个布尔值，指示对象自身属性中是否具有指定的属性
var hasOwn = Object.prototype.hasOwnProperty;
