let data = [
    {
        'city': '上海',
        'cityId': 0001,
        'schools': ['复旦大学', '上海交通大学', '同济大学']
    },
    {
        'city': '北京',
        'cityId': 0002,
        'schools': ['北京大学', '清华大学', '北京航空航天大学']
    },
    {
        'city': '杭州',
        'cityId': 0007,
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

    function listenTab() {
        addEvent(tab, 'change', function () {
            if (tab_item[0].firstElementChild.checked) {
                insch.className = 'insch';
                outsch.className = 'outsch hidden';
            } else if (tab_item[1].firstElementChild.checked) {
                insch.className = 'insch hidden';
                outsch.className = 'outsch';
            }
            render();
        })
    }

    function setData(index = 0) {

    }

    function render(arr) {
        let temp = '';
        arr.forEach(item=>{
            temp += '<option value="'+item+'">'
        })
    }
}
