
module.exports = function newArray(start, end) {
    var n0 = typeof start === 'number',
        n1 = typeof end === 'number'

    //start为number,end不为number,将start的值赋给end,再将start重置为0
    if (n0 && !n1) {
        end = start
        start = 0
    //start和end都不为number
    } else if (!n0 && !n1) {
        start = 0
        end = 0
    }

    start = start|0
    end = end|0
    var len = end-start
    if (len<0)
        throw new Error('array length must be positive')
    
    var a = new Array(len)
    //c=start从start所指的数字开始生成，包含start位置
    for (var i=0, c=start; i<len; i++, c++)
        a[i] = c
    return a
}