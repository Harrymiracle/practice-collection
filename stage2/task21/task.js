let tag_in = qs('.tag-in');
let tag_container = qs('.tag-container');
let hobbies_in = qs('.hobbies-in');
let confirm_btn = qs('.confirm-btn');
let hobbies_container = qs('.hobbies-container');

/**
 *  标签类
 *
 * @param {HTMLElement} container 容器
 */
function TagCreater(container) {
    this.queue = [];
    this.container = container;
    this.initEvent();   // 初始化监听事件
}
TagCreater.prototype = {
    constructor: TagCreater,    // 重置构造函数对象
    pushQueue: function (item) {    // 尾部逐个添加
        for (let i = 0, len = item.length; i < len; i++) {
            // 该项为空或是已经有该项 跳过
            if (!item[i] || this.queue.indexOf(item[i]) > -1) {
                continue;
            }
            this.queue.push(item[i]);   // queue先添加
            if (this.queue.length > 10) {   // 超过10删除前面的元素
                this.shiftQueue();
            }
            this.addTag(item[i]);   // 操作DOM
        }
    },
    shiftQueue: function () {
        this.queue.shift();
        this.removeFirstTag();
    },
    addTag: function (item) {
        let temp = document.createElement('div');
        temp.className = 'tag';
        temp.textContent = item;
        this.container.appendChild(temp);
    },
    removeFirstTag: function () {
        this.container.removeChild(this.container.firstElementChild);
    },
    initEvent: function () {
        let _self = this;
        addEvent(this.container, 'mouseover', function (e) {
            if (e.target && e.target.className === 'tag') {
                let txt = '点击删除 ' + e.target.innerHTML;
                e.target.innerHTML = txt;
            }
        });

        addEvent(this.container, 'mouseout', function (e) {
            if (e.target && e.target.className === 'tag') {
                let txt = e.target.innerHTML.replace(/点击删除\s/g, '');
                e.target.innerHTML = txt;
            }
        });

        addEvent(this.container, 'click', function (e) {
            if (e.target && e.target.className === 'tag') {
                let txt = e.target.innerHTML.replace(/点击删除\s/g, '');
                let index = _self.queue.indexOf(txt);
                if (index !== -1) {
                    _self.queue.splice(index, 1);
                }
                e.target.parentNode.removeChild(e.target);
            }
        });
    }
};

/**
 * 监听标签输入框的回车、空格和逗号按键
 */
addEvent(tag_in, 'keyup', function (e) {
    let txt = tag_in.value;
    if (e.keyCode === 13) {
        txt = txt.replace(/[,，\s]/g, '');
        txt.length && instance_tag.pushQueue([txt]);
        tag_in.value = '';
    }
    if (
        (e.keyCode === 32 || e.keyCode === 188)
        && /.[,，\s]+$/.test(txt)
    ) {
        txt = txt.replace(/[,，\s]/g, '');
        txt.length && instance_tag.pushQueue([txt]);
        tag_in.value = '';
    }
})

/**
 * 监听爱好确认按钮的点击事件
 */
addEvent(confirm_btn, 'click', function (e) {
    let txt = hobbies_in.value.trim();
    console.log(hobbies_in.value)
    let tempArr = txt.split(/[,，、\s\n\r\t]+/);
    tempArr.length && instance_hobby.pushQueue(tempArr);
    hobbies_in.value = '';
})

/**
* 实例化tag和hobby
*/
let instance_tag = new TagCreater(tag_container);
let instance_hobby = new TagCreater(hobbies_container);
