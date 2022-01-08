function defaultComparator (a, b) {
  return a - b
}

module.exports = function checksort (array, comparator) { //comparator为比较函数
  if (!Array.isArray(array)) throw new TypeError('Expected Array, got ' + (typeof array))  //检测如果不是数组抛出错误
  comparator = comparator || defaultComparator  //comparator没传参数默认为给定函数

  //遍历数组的各个项，用比较函数挨着比较前后项
  for (var i = 1, length = array.length; i < length; ++i) { //length在loop中存储数组的长度
    if (comparator(array[i - 1], array[i]) > 0) return false  //如果comparator不是function会自动抛出错误
  }

  return true
}
