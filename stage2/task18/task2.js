/****
 * 面向对象
 */

/* 获取页面元素 */
let typein = document.querySelector('.typein'),
    leftin = document.querySelector('.leftin'),
    rightin = document.querySelector('.rightin'),
    leftout = document.querySelector('.leftout'),
    rightout = document.querySelector('.rightout'),
    resContainer = document.querySelector('.resContainer');

let queue = {
    arr: [],
    leftin: function (val) {
        this.arr.unshift(val);
        this.render();
    },
    rightin: function (val) {
        this.arr.push(val);
        this.render();
    },
    leftout: function (val) {
        if (this.isEmpty) {
            alert('队列已为空！');
            return false;
        }
        let res = this.arr.shift(val);
        alert(res);
        this.render();
    },
    rightout: function (val) {
        if (this.isEmpty) {
            alert('队列已为空！');
            return false;
        }
        let res = this.arr.pop(val);
        alert(res);
        this.render();
    },
    isEmpty: function () {
        return this.arr.length === 0;
    },
    render: function () {
        console.log(this.arr);
        let temp = '';
        for (let i = 0, len = this.arr.length; i < len; i++) {
            temp += '<div>' + this.arr[i] + '</div>';
        }
        resContainer.innerHTML = temp;
        addEventDivs();
    },
    deleteByInd: function (index) {
        console.log(index);
        this.arr.splice(index, 1);
        this.render();
    }
}

function addEventDivs() {
    let lists = resContainer.childNodes;
    for (let i = 0, len = lists.length; i < len; i++) {
        addEvent(lists[i], 'click', function (index) {
            return function () {
                return queue.deleteByInd(index);
            }
        }(i))
    }
}

/* 给输入框增加事件 */
// addEvent(typein, 'keyup', function (e) {
//     if (!isNum(e.target.value)) {
//         alert('请正确输入数字');
//         return false;
//     }
// })

/* 给四个按钮增加事件 */
addEvent(leftin, 'click', function () {
    let val = typein.value;
    if (isNum(val)) {
        queue.leftin(val);
    } else {
        alert('请正确输入数字');
    }
});

addEvent(rightin, 'click', function () {
    let val = typein.value;
    if (isNum(val)) {
        queue.rightin(val);
    } else {
        alert('请正确输入数字');
    }
});

addEvent(leftout, 'click', function () {
    queue.leftout();
});

addEvent(rightout, 'click', function () {
    queue.rightout();
})