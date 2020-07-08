/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById('aqi-city-input'),
    valInput = document.getElementById('aqi-value-input'),
    addBtn = document.getElementById('add-btn'),
    aqiTable = document.getElementById('aqi-table');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityVal = cityInput.value.trim(),
        aqiValue = valInput.value.trim();

    if (validateVal(cityVal, aqiValue)) {
        aqiData[cityVal] = aqiValue;
    }
};


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var temp = '';
    for (let [k, v] of Object.entries(aqiData)) {
        temp += '<tr><td>' + k + '</td><td>' + v + '</td><td><button>操作</button></td></tr>';
    }
    aqiTable.innerHTML = temp;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    if (event.srcElement.innerHTML === '操作') {
        var pTr = event.srcElement.parentNode.parentNode;
        var key = pTr.firstElementChild.innerHTML;
        delete aqiData[key];
        console.log(aqiData)
        pTr.parentNode.removeChild(pTr);
        // renderAqiList();
    }
}

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
 * 校验输入值
 *
 * @param cityVal 城市值
 * @param aqiValue 空气值
 * @returns
 */
function validateVal(cityVal, aqiValue) {
    if (!(/^[a-zA-z \u4e00-\u9fa5]+$/.test(cityVal))) {
        alert('城市名必须为中文或是英文字符');
        return false;
    }
    if(!/^([+-])?\d+$/.test(aqiValue)){
        alert('请输入整数');
        return false;
    }
    return true;
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addEvent(addBtn, 'click', addBtnHandle);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    addEvent(aqiTable, 'click', delBtnHandle);
}

init();