var baseURL = 'http://customfront.yun300.cn/front/njdt/product/';
var imgBase = 'http://1912135091.pool6-site.make.yun300.cn';

// 搜索产品变量声明
var searchData = {
    currentPage: '1',   //当前所在页
    pageSize: '1',    //默认每页显示的条数
    params: {       //各个筛选属性
        njdtFlag: 'null',   //一个接口返回的唯一标识
        cateIds: 'null',        //点击的所有筛选项id  （多个以,隔开）
        diameter: 'null',       //表格中下拉框  直径
        shankDiameter: 'null',  //表格中下拉框 刀柄直径
        oal: 'null',        //表格中下拉框 燕麦
        fluteLength: 'null'     //表格中下拉框 长笛长度
    }   
};
// 搜索下拉框变量声明
var searchSelectData = {
    params: {       //各个筛选属性
        njdtFlag: 'null',   //一个接口返回的唯一标识
        cateIds: 'null'        //点击的所有筛选项id  （多个以,隔开）
    }  
};
var typeImgColorArr = ['#003bd1', '#00940d', '#5b00bd', '#ff6308', '#d90000', '#5c0022'];
var subData = [];   //根据第一级查询来的数据
var selectedId = [];   //已选的项的id集合
var showingStep = [];   //展示的步骤step的ID

var loading = $('.loading');

// 获取初始数据 事件处理
$(function () {
    showLoading.bind(loading)(true);
    // 获取第一步的类型
    getToolTypes(function(){
        showLoading.bind(loading)(false);
        $('.step-type').find('header.hd-type').addClass('down');    
        $('.step-type .filter-groups-container').show();
    });

    // 点击每步上的大标题 处理本步骤下的UI交互
    $('.step').on('click','header',function(){
        var _this = this;
        toggleNode.bind(_this)();
    });
    
    // 点击类型 
    $('.step-type .filter-groups-container').on('click','li',function(){
        var _this = this;
        $('table.dataTable').find('tbody').html('');
        $('.step.step-prod .filter-groups').css({'display':'block'});
        chooseStepTypes.bind(_this)();
        // setButton.bind(_this)();
    });

    // 点击单选项
    $('.step.single .filter-groups-container').on('click','li',function(){
        var _this = this;
        $('table.dataTable').find('tbody').html('');
        singleItem.bind(_this)('single');
    });

    // 点击多选项
    $('.step.mult .filter-groups-container').on('click','li',function(){
        var _this = this;
        $('table.dataTable').find('tbody').html('');
        multItem.bind(_this)();
    });

    // 重置按钮
    $('.filter-btn-groups').on('click','.reset',function(){
        window.location.reload();
    });

    // 下一步按钮
    $('.filter-btn-groups').on('click','.next-step',function(){
        var _this = this;
        goNext.bind(_this)();
    });

    // 查看产品
    $('.filter-btn-groups').on('click','.next-step-prod',function(){
        $('.step-prod').find('header').click();
    });

    // 每页显示数
    $('.dataTables-length select').change(function(){
        searchData.pageSize = $(this).val();
        searchData.currentPage = '1';
        getProduct((data) => { creatTable(data); });
    });

    // 表格中下拉筛选
    $('.dataTables-wrapper table').on('change','select',function(){
        var _this = this;
        searchData.currentPage = '1';
        $('table.dataTable').find('tbody').html('');
        selectTable.bind(_this)($(_this).attr('class'));
    });

});



// 获取工具类型
function getToolTypes(callback){
    var params = {};
    $.ajax({
        type: 'get',
        url: baseURL + 'getHead',
        data: params,
        success: function (res) {
            var resData = [];
            if (res && res.code == 200 && res.content) {
                resData = res.content;
                creatNodeListTypes(resData,$('.step-type'));
            }
            if (callback) {
                callback();
            }
        },
        error: function (err) {
            if (callback) {
                callback();
            }
        }
    });
}

// 获取子类型数据
function getSubData(id,callback){
    var param = {
        params: {
            typeId: id
        }
    };
    $.ajax({
        type: 'get',
        url: baseURL + 'findByPagination',
        data: param,
        success: function (res) {
            subData = res;
            searchData.params.njdtFlag = res.msg;            
            if (callback) {
                callback();
            }
        },
        error: function (err) {
            if (callback) {
                callback(err);
            }
        }
    });
}

// 获取产品
function getProduct(callback){
    $.ajax({
        type: 'post',
        url: baseURL + 'getXialaProduct',
        data: searchData,
        success: function (res) {
            if (res.list && res.list.length && callback) {
                callback(res.list);
                loadPage(res.totalCount,res.pageSize,res.currentPage);
            }else{
                $('.pagination-sel').children("li").remove().end().css('display','none');
            }
        },
        error: function (err) {
            if (callback) {
                callback(err);
            }
        }
    });
}

// 获取下拉选项
function getSelectData(callback){
    searchSelectData.params.njdtFlag = searchData.params.njdtFlag;
    searchSelectData.params.cateIds = searchData.params.cateIds;
    $.ajax({
        type: 'post',
        url: baseURL + 'getXiala',
        data: searchSelectData,
        success: function (res) {
            if (res.content && callback) {
                callback(res.content);
            }
        },
        error: function (err) {
            if (callback) {
                callback(err);
            }
        }
    });
}

// 切换显示/隐藏 本步骤下的子项
function toggleNode(){
    var _this = this;
    var _isDown = $(_this).hasClass('down');
    $(_this)[_isDown?'removeClass':'addClass']('down');
    $(_this).next('.filter-groups-container').slideToggle();
    //父级同辈元素去掉 down类名 及其下子容器 收起
    $(_this).parent('.step').siblings().find('header').removeClass('down')
        .end().find('.filter-groups-container').slideUp();
}

// 点击 类型 下的选项 
function chooseStepTypes(){
    var _this = this;
    showingStep = [];
    var _isSelected = $(_this).hasClass('selected');
    var parentStep = $(_this).parents('.step');
    parentStep.find('.next-step, .next-step-prod').css({'display': 'none'}); 
    $('.step:not(:first,:last)').find('.filter-groups').remove();
    parentStep.siblings('.step').each(function(i,el){
        $(el).find('li').removeClass('selected')
        .end().find('.next-step, .next-step-prod').css({'display': 'none'});    //隐藏下一步和传查看产品按钮
    });
    //选中点击项时 获取子项数据
    !_isSelected && getSubData($(_this).attr('data-id'),function(){
        //按 工件材质、工具结构、计算标准、规格、额外属性 的顺序分析，判断是否展示2-6步的各个项
        if(subData.content){
            analysisData(subData.content);
            $('.step-type').next('.step.isShow').find('.filter-groups').css({'display':'-webkit-flex','display':'flex'});
        }
        selectedId = [];
        selectedId.push($(_this).attr('data-id'));
        searchData.params.cateIds = [...new Set(selectedId)].join(',');
        getProduct((data) => { creatTable(data); });
        getSelectData((data) => { setSelectData(data) });

    });

    $(_this)[_isSelected?'removeClass':'addClass']('selected').siblings().removeClass('selected');
    
    if(!_isSelected){   //选中点击项时 处理UI显示
        $('header.hd-type').click();
        $(_this).parents('.filter-groups').next('div.filter-btn-groups').find('.next-step').show();
    }else{
        window.location.reload();
    }
}

// 点击单选项 
function singleItem(stepSingle){
    var _this = this;
    var _isSelected = $(_this).hasClass('selected');
    var ids = [];
    var dataId = $(_this).attr('data-id');
    $(_this)[_isSelected?'removeClass':'addClass']('selected').siblings().removeClass('selected');
    //选中点击项时 
    !_isSelected && (function(){
        selectedId.push(dataId);
        var _thisIsShow = $(_this).parents('.step.isShow');
        goNext.bind(_this)(stepSingle);   //点击单选，找到下一个显示的step，触发点击
        _thisIsShow.find('.filter-groups').next('div.filter-btn-groups').find('.next-step').show();//显示本步骤 下一步按钮
    })()
    //取消选中点击项时 
    if(_isSelected){  
        selectedId.forEach(function(el,ind){
            if(el == dataId){
                selectedId.splice(ind,1);
            }
        })
        $(_this).parents('.filter-groups').siblings('div.filter-btn-groups').find('.next-step').hide()
        .end().find('.next-step-prod').hide();//隐藏本步骤 下一步按钮
    }
    //去掉同辈元素中的已有id
    $(_this).siblings().each(function(i,el){
        ids.push($(el).attr('data-id'));
    });
    if(ids.length){
        for(let i=0,len=selectedId.length;i<len;i++){
            if(ids.includes(selectedId[i])){
                selectedId.splice(i,1);
            }
        }
    }
    
    searchData.params.cateIds = [...new Set(selectedId)].join(',');
    getProduct((data) => { creatTable(data); });
    getSelectData((data) => { setSelectData(data) });

    //下一个步骤是查看产品
    if($(_this).parents('.step').hasClass(showingStep[showingStep.length-1])){
        $(_this).parents('.filter-groups').next('div.filter-btn-groups').find('.next-step').hide()
        .end().find('.next-step-prod').show();
    }
}

// 点击多选项 
function multItem(){
    var _this = this;
    var _isSelected = $(_this).hasClass('selected');
    var show_next_prod = false; //是否直接显示产品
    var btnGroup = $(_this).parents('.filter-groups').siblings('div.filter-btn-groups');
    $(_this)[_isSelected?'removeClass':'addClass']('selected');
    //多选中有一项是被选中，就显示查看产品按钮
    $(_this).parents('.filter-groups-container').find('li.item-select').each(function(i,e){
        if($(e).hasClass('selected')){
            show_next_prod = true;
            return;
        }
    })

    selectedId = [...new Set(selectedId)]
    if(!_isSelected){   //被点击项 被选中   显示按钮
        btnGroup.find('.next-step').show();
        btnGroup.find('.next-step-prod').show();
        selectedId.push($(_this).attr('data-id'));
    }else{
        var dataId = $(_this).attr('data-id');
        selectedId.forEach(function(el,ind){
            if(el == dataId){
                selectedId.splice(ind,1);
            }
        })
    }
    if(_isSelected && !show_next_prod){ //被点项取消选中且同辈元素中再也没有被选中项  隐藏按钮
        btnGroup.find('.next-step').hide();
        btnGroup.find('.next-step-prod').hide();
    }
    
    searchData.params.cateIds = selectedId.join(',');
    getProduct((data) => { creatTable(data); });
    getSelectData((data) => { setSelectData(data) });
}

// 下一步
function goNext(stepSingle){
    var _this = this;
    var parentStep = $(_this).parents('.step');
    var _index = parentStep.index('.step');
    var nextSib = parentStep.parent('.container').find('.step:gt('+_index+')');
    
    for(let i=0,len=nextSib.length;i<len;i++){
        if(stepSingle && $(nextSib[i]).css('display')==='block'){ //为单选 且 下一个显示的同辈元素下显示
            $(nextSib[i]).find('.filter-groups').css({'display':'-webkit-flex','display':'flex'});
        }
        if($(nextSib[i]).hasClass('mult') && $(nextSib[i]).css('display')==='block'){//为多选 且 下一个显示的同辈元素下显示
            $(nextSib[i]).find('.filter-groups').css({'display':'-webkit-flex','display':'flex'});
        }
        if($(nextSib[i]).css('display')==='block'){ //下一个显示的同辈元素触发点击
            $(nextSib[i]).find('header').click();
            break;
        }
    }
}


// 按 工件材质、工具结构、计算标准、规格、额外属性 的顺序分析，判断是否展示2-6步的各个项
function analysisData(Data){
    var numArr = [2,3,4,5,6,7]; 
    var stepFlag = 0;
    if(Data.gongjianshaixuan && Data.gongjianshaixuan.length && Data.gongjianshaixuan[0].list && Data.gongjianshaixuan[0].list.length){
        //处理头部的数字
        var stepMaterialHd = $('.step-material').find('header em');
        var tempTxt = stepMaterialHd.text().replace(/\d/,numArr[stepFlag]);
        stepMaterialHd.text(tempTxt);
        //处理下一步显示的数字
        var materialStep = $('.step-material .filter-btn-groups .button-area').find('button.next-step');
        var stepTempTxt = materialStep.html().replace(/\d/,numArr[stepFlag]+1);
        materialStep.html(stepTempTxt);
        $('.step-material').css({'display': 'block'}).addClass('isShow');//显示步骤块
        creatNodeList(Data.gongjianshaixuan, $('.step-material'));  
        showingStep.push('step-material');
        stepFlag++;
    }else{
        $('.step-material').css({'display': 'none'}).removeClass('isShow');
    }
    if(Data.gongjushaixuan && Data.gongjushaixuan.length && Data.gongjushaixuan[0].list && Data.gongjushaixuan[0].list.length){
        var stepStructureHd = $('.step-structure').find('header em');
        var tempTxt = stepStructureHd.text().replace(/\d/,numArr[stepFlag]);
        stepStructureHd.text(tempTxt);
        var structureStep = $('.step-structure .filter-btn-groups .button-area').find('button.next-step');
        var stepTempTxt = structureStep.html().replace(/\d/,numArr[stepFlag]+1);
        structureStep.html(stepTempTxt);
        $('.step-structure').css({'display': 'block'}).addClass('isShow');
        creatNodeList(Data.gongjushaixuan, $('.step-structure'));
        showingStep.push('step-structure');
        stepFlag++;
    }else{
        $('.step-structure').css({'display': 'none'}).removeClass('isShow');
    }
    if(Data.jisuanshaixuan && Data.jisuanshaixuan.length && Data.jisuanshaixuan[0].list && Data.jisuanshaixuan[0].list.length){
        var stepStandardHd = $('.step-standard').find('header em');
        var tempTxt = stepStandardHd.text().replace(/\d/,numArr[stepFlag]);
        stepStandardHd.text(tempTxt);
        var standardStep = $('.step-standard .filter-btn-groups .button-area').find('button.next-step');
        var stepTempTxt = standardStep.html().replace(/\d/,numArr[stepFlag]+1);
        standardStep.html(stepTempTxt);
        $('.step-standard').css({'display': 'block'}).addClass('isShow');
        creatNodeList(Data.jisuanshaixuan, $('.step-standard'));
        showingStep.push('step-standard');
        stepFlag++;
    }else{
        $('.step-standard').css({'display': 'none'}).removeClass('isShow');
    }
    if(Data.guigeShaixuan && Data.guigeShaixuan.length){
        var showSpecif = false;
        for (let i=0,len=Data.guigeShaixuan.length;i<len;i++){
            if(Data.guigeShaixuan[i].list && Data.guigeShaixuan[i].list.length){
                showSpecif = true;
                break;
            }
        }
        if(showSpecif){
            var stepSpecifHd = $('.step-specif').find('header em');
            var tempTxt = stepSpecifHd.text().replace(/\d/,numArr[stepFlag]);
            stepSpecifHd.text(tempTxt);
            var specifStep = $('.step-specif .filter-btn-groups .button-area').find('button.next-step');
            var stepTempTxt = specifStep.html().replace(/\d/,numArr[stepFlag]+1);
            specifStep.html(stepTempTxt);
            $('.step-specif').css({'display': 'block'}).addClass('isShow');
            creatNodeList(Data.guigeShaixuan, $('.step-specif'));
            showingStep.push('step-specif');
            stepFlag++;
        }else{
            $('.step-specif').css({'display': 'none'}).removeClass('isShow');
        }
    }
    if(Data.ewaishaixuan && Data.ewaishaixuan.length){
        var showExtra = false;
        for (let i=0,len=Data.ewaishaixuan.length;i<len;i++){
            if(Data.ewaishaixuan[i].list && Data.ewaishaixuan[i].list.length){
                showExtra = true;
                break;
            }
        }
        if(showExtra){
            var stepExtraHd = $('.step-extra').find('header em');
            var tempTxt = stepExtraHd.text().replace(/\d/,numArr[stepFlag]);
            stepExtraHd.text(tempTxt);
            $('.step-extra').css({'display': 'block'}).addClass('isShow');
            creatNodeList(Data.ewaishaixuan, $('.step-extra'));
            showingStep.push('step-extra');
            stepFlag++;
        }else{
            $('.step-extra').css({'display': 'none'}).removeClass('isShow');
        }
    }    
    //处理产品头部显示的数字
    var stepProdHd = $('.step-prod').find('header em');
    var tempTxt = stepProdHd.text().replace(/\d/,numArr[stepFlag]);
    stepProdHd.text(tempTxt);
    if(!stepFlag){
        $('.step-type .filter-btn-groups').find('.next-step-prod').css({'display':'inline-block'});
        $('.step-type .filter-btn-groups').find('.next-step').css({'display':'none'});
    }
    $('.step.step-prod').css({'display': 'block'});
    if($('.step.isShow')[0]){
        $($('.step.isShow')[0]).find('header').click();
    }else{
        $('.step-prod header').click();
    }
}


// 生成第一步列表中的项
function creatNodeListTypes(data, node) {
    var temp = '';
    var typeImgArr = [];    //选择类型图片容器
    if(data.length){
        temp += '<div class="filter-groups"><ul class="wizard-select">'
        data.forEach(function(item, index) {
            item.imgUrl ? typeImgArr.push(item.imgUrl) : typeImgArr.push(0);
            temp += '<li id="'+item.name+'" data-pid="'+item.pid+'" data-id="'+item.id+'" class="item-select">'
                    +'<a class="type-anchor" href="javascript:void(0);"><p>'+item.name+'<span>('+item.total+')</span></p></a></li>';
        });
        temp += ' </ul></div>';
    }
    var container = node.find('.filter-groups-container');
    container.prepend(temp).find('.filter-groups').css({'display':'-webkit-flex','display':'flex'});
    var anchor = container.find('a');
    anchor.each(function(i,el){
        if(typeImgArr[i]){
            $(el).css({'background-image': 'url('+imgBase+typeImgArr[i]+')'});
        }else{
            // $(el).css({'background-color': typeImgColorArr[i]});
        }
    })
}

// 生成除第一步外的列表项
function creatNodeList(data, node){
    var temp = '';
    if(data.length === 1){
        data.forEach(function(item, index) {
            if(item.list && item.list.length){
                temp += '<div class="filter-groups"><ul class="wizard-select">'
                item.list.forEach(function(subItem, subInd){
                    temp += '<li id="'+subItem.name+'" data-pid="'+subItem.pid+'" data-id="'+subItem.id+'" class="item-select">'
                            +'<a href="javascript:void(0);"><p>'+subItem.name+'<span>('+subItem.count+')</span></p></a></li>';
                })
                temp += ' </ul></div>';
            }
        });
    }
    if(data.length > 1){
        data.forEach(function(item, index) {
            if(item.list && item.list.length){
                temp += '<div class="filter-groups">'+item.name+'<ul class="wizard-select">'
                item.list.forEach(function(subItem, subInd){
                    temp += '<li id="'+subItem.name+'" data-pid="'+subItem.pid+'" data-id="'+subItem.id+'" class="item-select">'
                            +'<a href="javascript:void(0);"><p>'+subItem.name+'<span>('+subItem.count+')</span></p></a></li>';
                })
                temp += ' </ul></div>';
            }
        });
    }
    node.find('.filter-groups-container').prepend(temp).find('.filter-groups').css({'display':'-webkit-flex','display':'flex'});
}

// 生成表格
function creatTable(data){    
    var temp = '';
    data.forEach(function(item,index){
        if(index%2===0){
            temp += '<tr role="row" class="odd">'
        }else{
            temp += '<tr role="row" class="even">'
        }
        var tool = item.tool || '--';
        var series = item.series || '--';
        var edp = item.edp || '--';
        var diameter = item.diameter || '--';
        var shankDiameter = item.shankDiameter || '--';
        var oal = item.oal || '--';
        var fluteLength = item.fluteLength || '--';
        var available = item.available || '--';
        var price = item.price || '--';
        temp += '<td class=""><a class="under-line" href="'+ imgBase + '/product/' +item.id+'.html">'+tool+'</a></td>'
                +'<td class="">'+series+'</td>'
                +'<td>'+edp+'</td><td>'+diameter+'</td><td>'+shankDiameter+'</td>'
                +'<td>'+oal+'</td><td>'+fluteLength+'</td><td>'+available+'</td>'
                +'<td>'+price+'</td></tr>'
    })
    $('table.dataTable').find('tbody').html(temp);
}

// 设置下拉框数据
function setSelectData(data){
    data.diameters && data.diameters.length && setSelect($('.dataTable tfoot').find('select.diameter'),data.diameters);
    data.shankDiameters && data.shankDiameters.length && setSelect($('.dataTable tfoot').find('select.shankDiameter'),data.shankDiameters);
    data.oals && data.oals.length && setSelect($('.dataTable tfoot').find('select.oal'),data.oals);
    data.fluteLengths && data.fluteLengths.length && setSelect($('.dataTable tfoot').find('select.fluteLength'),data.fluteLengths);
}

function setSelect(el,data){
    var temp = '';
    el.find("option:gt(0)").remove();
    for(let i=0,len=data.length;i<len;i++){
        if(data[i]===null||data[i]===''||data[i]===undefined||data[i]==='undefined'||data[i]==='Undefined'){
            continue;
        };
        temp += '<option value="'+data[i]+'">'+data[i]+'</option>';
    }
    el.append(temp);
}

// 用select中的值筛选表格
function selectTable(class_name){
    var _this = this;
    var id = $(_this).val();
    switch(class_name){
        case 'diameter':
            searchData.params.diameter = id || 'null'; break;
        case 'shankDiameter':
            searchData.params.shankDiameter = id || 'null'; break;
        case 'oal':
            searchData.params.oal = id || 'null'; break;
        case 'fluteLength':
            searchData.params.fluteLength = id || 'null'; break;
    }
    getProduct((data) => { creatTable(data); });
}

// 生成分页 （静态分页插件调用方式）
// function loadPage(total,pageSize,curPage){
//     $.paginationInit({
//         container: '.pagination-sel',
//         totalLists: total,      //总条数
//         pageSize: pageSize,
//         currentPage: curPage,
//         callBack: function(cur){
//             searchData.currentPage = +cur;
//             getProduct((data) => { creatTable(data); });
//         }
//     });
// }

// 生成分页 （jq实例对象分页插件调用方式）
function loadPage(total,pageSize,curPage){
    $('.pagination-sel').paginationInit({
        totalLists: total,      //总条数
        pageSize: pageSize,
        currentPage: curPage,
        callBack: function(cur){
            searchData.currentPage = +cur;
            getProduct((data) => { creatTable(data); });
        }
    });
}

// 显示/隐藏加载中
function showLoading(show){
    var _this = $(this);
    show ? _this.css({'display':'block'}): _this.css({'display':'none'});
}