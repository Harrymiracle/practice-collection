let magnification = 5;      // 放大倍数
let isAnimation = false;    // 是否正在排序
let initInterval = 150;     // 间隔执行时间

/* 获取页面元素 */
let inNum = qs('.inNum'),
    leftin = qs('.leftin'),
    rightin = qs('.rightin'),
    leftout = qs('.leftout'),
    rightout = qs('.rightout'),
    random = qs('.random'),
    unsort = qs('.unsort'),
    sort = qs('.sort'),
    delay = qs('.delay'),
    resBox = qs('.resBox');

let queue = {
    arr: [],
    render: function () {
        console.log(this.arr);
        // 用数组的map方法返回一个包含由div字符串的数组
        resBox.innerHTML = this.arr.map((num) => {
            return '<div class="red" style="height:' + this.calHeight(num) + 'px;"></div>';
        }).join('');
    },
    actions: function (fun, callback) {
        // 取第二个参数后面的参数（有可能没有值）
        let args = [].slice.call(arguments, 2);
        return function (e) {
            try {
                let arg = args.map((item) => {
                    return typeof item === 'function' ? item(e) : item;
                })
                let res = fun.apply(queue.arr, arg);
                if (callback) {
                    callback(res);
                }
            } catch (err) {
                alert(err);
            }
            queue.render();
        }
    },
    // 获取输入框的值并校验后返回输入框的值
    getInNum: function () {
        let val = inNum.value;
        /****
         * 此处抛错比return false起作用
         */
        if (queue.outRange(val)) {
            throw new Error('请正确输入10-100之间不带符号的正整数');
        }
        if (queue.arr.length > 59) {
            throw new Error('队列最多容纳60个元素');
        }
        return parseInt(val.trim());
    },
    calHeight: function (num) {
        return magnification * num;
    },
    // 获取点击的div的index值
    getClickIndex: function (e) {
        let target = e.target;
        return [].indexOf.call(target.parentNode.children, target);
    },
    outRange: function (val) {
        val = parseInt(val);
        if (!(val >= 10 && val <= 100)) {
            return true;
        }
        return false;
    }
}

function createRandomNum50() {
    let index = 50;
    queue.arr = [];
    while (index) {
        queue.arr.push(Math.floor(Math.random() * 91 + 10));
        index--;
    }
    queue.render();
}

function setUnordered(e) {
    let l = queue.arr.length;
    while (l) {
        let j = Math.floor(Math.random() * l--);
        [queue.arr[l], queue.arr[j]] = [queue.arr[j], queue.arr[l]];
    }
    console.log(queue.arr);
    queue.render();
}

/* 给按钮增加点击事件 */
leftin.onclick = queue.actions([].unshift, null, queue.getInNum);
rightin.onclick = queue.actions([].push, null, queue.getInNum);
leftout.onclick = queue.actions([].shift, window.alert);
rightout.onclick = queue.actions([].pop, window.alert);
random.onclick = createRandomNum50;
unsort.onclick = setUnordered;

// addEvent(sort, 'click', function () {

// });

resBox.onclick = queue.actions([].splice, null, queue.getClickIndex, 1);
