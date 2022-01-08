var EventUtil = {
    addHandler: function(el, type, handler) { //添加事件处理函数
        if (el.addEventListener) { //能力检测
            el.addEventListener(type, handler, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, handler);
        } else {
            el['on' + type] = handler;
        }
    },
    removeHandler: function(el, type, handler) { //移除事件处理函数
        if (el.removeEventListener) {
            el.removeEventListener(type, handler, false);
        } else if (el.detachEvent) {
            el.detachEvent('on' + type, handler);
        } else {
            el['on' + type] = null;
        }
    },
    getEvent: function(event) { //获取event对象
        return event ? event : window.event; //兼容DOM的浏览器中直接返回event,IE中event在window对象上
    },
    getTarget: function(event) { //获取事件的目标
        return event.target || event.srcElement; //检测event对象的target属性，不存在则返回event.srcElement
    },
    preventDefault: function(event) { //取消事件的默认行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) { //阻止事件流
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function(event) { //获取相关元素
        if (event.relatedTarget) { //DOM通过EVENT对象的relatedTarget对象提供相关信息，只有对mouseover和mouseout事件才有值，对其他事件，这个属性的值是null
            return event.relatedTarget;
        } else if (event.toElement) { //IE中，mouseout事件触发时，toElement属性中保存了相关元素信息
            return event.toElement;
        } else if (event.fromElement) { //IE中，mouseover事件触发时，fromElement属性中保存了相关元素信息
            return event.fromElement;
        } else {
            return null;
        }
    },
    getButton: function(event) { //获取button属性 //对于mousedown和mouseup事件，其event对象中有一个button属性。
        if (document.implementation.hasFeature('MouseEvents', '2.0')) { //用hasFeature()方法检测支持DOM版鼠标事件的浏览器
            return event.button;
        } else { //IE
            switch (event.button) {
                case 0: //没有按下键
                case 1: //左键
                case 3: //左键+右键
                case 5: //左键+中键
                case 7: //左键+中键+右键
                    return 0;
                case 2: //右键
                case 6: //右键+中键
                    return 2;
                case 4: //中键
                    return 1;
            }
        }
    },
    getWheelDelta: function(event) { //获取鼠标滚轮增量值
        if (event.wheelDelta) { //检测event对象是否有wheelDelta属性
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta); //在OPera的9.5版本之前，向前是负，向后是正。
        } else { //不存在 就在event对象的detail属性中查找（FireFox 支持DOMMouseScroll的事件，相关信息保存在event的detail属性中，向前是-3的倍数，向后是3的倍数。）
            return -event.detail * 40;
        }
    },
    getCharCode: function(event) {
        if (typeof event.charCode == 'number') { //只发生在keypress事件时才有值（按下那个键代表字符的ASCII编码），此时keyCode等于0或所按键的键码。
            return event.charCode;
        } else { //IE8及以前版本和opera是在keyCode中保存字符的ASCII码
            return event.keyCode;
        }
    }
}