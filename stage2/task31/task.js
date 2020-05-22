let resData = [
    {
        'city': '上海',
        'cityId': '0001',
        'schools': ['复旦大学', '上海交通大学', '同济大学']
    },
    {
        'city': '北京',
        'cityId': '0002',
        'schools': ['北京大学', '清华大学', '北京航空航天大学']
    },
    {
        'city': '杭州',
        'cityId': '0007',
        'schools': ['浙江大学', '杭州电子科技大学', '浙江工业大学']
    }
];

window.onload = function () {
    let tab = qs('.tab'),
        tab_item = qsa('.tab-item'),
        insch = qs('.insch'),
        city = qs('.city'),
        outsch = qs('.outsch'),
        school = qs('.school');

    listenTab();
    render(deal(resData, resData[0]['cityId'], true));

    // 注册事件监听
    function listenTab() {
        addEvent(tab, 'change', function () {
            if (tab_item[0].firstElementChild.checked) {
                insch.className = 'insch';
                outsch.className = 'outsch hidden';
                render(deal(resData, resData[0]['cityId'], true));
            } else if (tab_item[1].firstElementChild.checked) {
                insch.className = 'insch hidden';
                outsch.className = 'outsch';
            }
        })

        addEvent(city, 'change', function () {
            // console.log(city.selectedIndex);  // selectedIndex当前option的选中项的index
            render(deal(resData, this.value, false));
        })
    }

    // 处理数据，返回处理后的DOM字符串  初始化时才处理城市下的option
    function deal(arr, checkedId, isInit) {
        let tempCity = '', tempSchool = '', Selected = '';
        arr.forEach(item => {
            checkedId === item.cityId ? Selected = 'selected' : Selected = '';
            isInit && (tempCity += '<option value="' + item.cityId + '"' + Selected + '>' + item.city + '</option>');
            checkedId === item.cityId && item.schools.map(n => {
                tempSchool += '<option value="' + n + '">' + n + '</option>';
            })
        });
        return {
            isInit,
            tempCity,
            tempSchool
        }
    }

    // 渲染字符串到对应元素
    function render(obj) {
        if (obj.isInit) { city.innerHTML = obj.tempCity; }
        school.innerHTML = obj.tempSchool;
    }
}
