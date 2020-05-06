/**
 * 封装事件监听函数
 *
 * @param  target 监听目标
 * @param  type 监听事件类型
 * @param  handler 事件处理程序
 */
function addEvent(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else if (target.attachEvent) {
        target.attachEvent('on' + type, handler);
    } else {
        target['on' + type] = handler;
    }
}


/**
 * 判断是否是数字 可以带符号
 *
 * @param 输入的数字
 */
function isNum(num) {
    return /^([+-])?\d+(\.\d+)?$/.test(num);
}