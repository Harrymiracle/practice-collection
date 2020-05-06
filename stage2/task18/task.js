let resArr = [];

/* 获取页面元素 */
let typein = document.querySelector('.typein'),
    leftin = document.querySelector('.leftin'),
    rightin = document.querySelector('.rightin'),
    leftout = document.querySelector('.leftout'),
    rightout = document.querySelector('.rightout'),
    resContainer = document.querySelector('.resContainer');

/* 根据列表重新渲染 */
function renderRes() {
    console.log(resArr)
    let temp = '';
    for (let i = 0, len = resArr.length; i < len; i++) {
        temp += '<div>' + resArr[i] + '</div>';
    }
    resContainer.innerHTML = temp;
    addEventDivs();
}

/* 给下面展示的div增加事件 */
function addEventDivs() {
    let lists = resContainer.childNodes;
    for (let i = 0, len = lists.length; i < len; i++) {
        addEvent(lists[i], 'click', function (index) {
            return function () {
                console.log(index)
                resArr.splice(index, 1);
                renderRes();
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
        resArr.unshift(val);
        renderRes();
    } else {
        alert('请正确输入数字');
    }
})

addEvent(rightin, 'click', function () {
    let val = typein.value;
    if (isNum(val)) {
        resArr.push(val);
        renderRes();
    } else {
        alert('请正确输入数字');
    }
})

addEvent(leftout, 'click', function () {
    let val = typein.value;
    if (!resArr.length) {
        alert('队列已为空！');
        return false;
    }
    let res = resArr.shift(val);
    alert(res);
    renderRes();
})

addEvent(rightout, 'click', function () {
    let val = typein.value;
    if (!resArr.length) {
        alert('队列已为空！');
        return false;
    }
    let res = resArr.pop(val);
    alert(res);
    renderRes();
})
