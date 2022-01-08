$(function(){
    var num = $("input:checkbox:checked").length;
    $("#shopcar span").text(num);
});

var arr = [];
//    选中效果
function checkedThisDrugs(check){
    var state = $(check).attr("data-state");
    var a = $(check).parent().attr("data-sid");
    if(state == "false"){
        $(check).children("img").attr("src","../views/images/person/icon-checked.png");
        $(check).children("input").attr('checked',true) ;
        $(check).attr("data-state","true");
        arr.push({productId:a});
    }
    if(state == "true"){
        $(check).children("img").attr("src","../views/images/person/icon-check.png");
        $(check).children("input").attr('checked',false);
        $(check).attr("data-state","false");
        for(var i=0; i<arr.length; i++){
            if(arr[i] == a){
                arr.splice(i, 1);
            }
        }
    }
}

function addDrugForShopCar(){
    console.log(arr);
    if(arr.length!=0){
        $.ajax({
            type:"post",
            url:"/drug/adddrug",
            data:{productCartDatas:arr},
            dataType:"json",
            success:function(data){
//                console.log(data);
                if(data.status == "SUCCEED"){
                    var num= $("#shopcar").text();
                    num = parseInt(num) + arr.length;
                    $("#shopcar").text(num);

                    $('#addscuess').show().delay(2000).hide(0);
                }
            }
        });
    }else {
        $('<div class="am-dimmer am-active" data-am-dimmer> </div>').appendTo("body").show();
        $("#order-type--alert").show();
    }
}

//    输入框监听
$("#search").bind('input propertychange',function(){
    var value = $(this).val();
//        console.log(value);
    $("#result-list li").remove();
    $(".result p.no-data").hide();

    if(value!==""){
        $("#result-list").show();
        drugFuzzySearch(value);
    }
    if(value==""){
        $(".result table tbody tr").remove();
    }
});

//模糊搜索结果提示列表
function resultListClick(t){
    $(".result table tbody tr").remove();
    var value = $(t).children(".name").text();
    $("#search").val(value);
//        console.log(value);
    sendShowTable(value);
    $(t).parent().hide();
}

function sendShowTable(value){
    $.post('/drug/drugfuzzysearch',{name:value},function(res){
//            console.log(res);
        if(res.status == "SUCCEED"){
            if(res.data && res.data.length!=0 && data!=""){
                $(".main .small-btn").show();
                var data = res.data;
                $.each(data,function(i,item){
                    $('  <tr data-sid="'+item.sid+'">'+
                        '<td class="am-u-sm-1" onclick="checkedThisDrugs(this)" data-state="false">' +
                        '<input type="checkbox" name="drug"> ' +
                        '<img src="../views/images/person/icon-check.png" alt="">' +
                        '</td>'+
                        '<td class="am-u-sm-2">'+(i+1)+'</td>'+
                        '<td class="am-u-sm-4">'+item.pCode+'</td>'+
                        '<td class="am-u-sm-5">' +
                        '<a href="/drug/drugdetails?product='+item.sid+'">'+item.pName+'</a>' +
                        '</td>'+
                        '</tr>').appendTo(".result table tbody");
                });
            }else {
                $(".result p.no-data").show();
            }
        }
    });
}

//    点击搜索按钮
function searchInputValue(click){
    $(".result table tbody tr").remove();
    var value = $("#search").val();
    $("#result-list").hide();
    if(value!==""){
        sendShowTable(value);
        $(".main .small-btn").show();
    }
}

function drugFuzzySearch(value){
    $.post('/drug/drugfuzzysearch',{name:value},function(res){
//            console.log(res);
        if(res.status == "SUCCEED"){
            if(res.data && res.data.length!=0){
                var data = res.data;
                $.each(data,function(i,item){
                    $(' <li onclick="resultListClick(this)"><span>'+item.pCode+'</span><span class="name">'+item.pName+'</span></li>').appendTo("#result-list");
                });
            }
        }
    });
}

function modalDisplay() {
    $('div.am-dimmer').remove();
    $("#order-type--alert").hide();
}