//选择
var arr = [];
function checkDrugConfirm(check){
    var state = $(check).parent("div").attr("data-state");
    var a = $(check).siblings("input").attr("data-p");
    if(state == "true"){
        $(check).children("img").attr("src","../views/images/task/icon-check01.png");
        $(check).siblings("input").attr('checked',false) ;
        $(check).parent("div").attr("data-state","false");
        for(var i=0; i<arr.length; i++){
            if(arr[i] == a){
                arr.splice(i, 1);
            }
        }
    }
    if(state == "false"){
        $(check).children("img").attr("src","../views/images/task/icon-checked01.png");
        $(check).siblings("input").attr('checked',true) ;
        $(check).parent("div").attr("data-state","true");
        arr.push(a);
    }
}

//数量加减
function delectOrAddDrugNum(t,state){
    var num = $(t).siblings().children("input").val();
    var cart = $(t).parent().attr("date-cart");
    if(num>0){
        if(state == "del"){
            num--;
        }
        if(state == "add"){
            num++;
        }
    }
//        console.log(num);
    if(num && num!="" && num!=undefined && cart){
        $.post('/cart/updateproduct',{num:num,cart:cart},function(data){
//                console.log(data);
            if(data == "SUCCEED"){
                $(t).siblings().children("input").val(num);
            }else {
                $("#order-type--alert").show().find(".am-modal-bd").text("修改商品数量失败，请刷新试试！");
                $('<div class="am-dimmer am-active" data-am-dimmer> </div>').appendTo("body").show();
            }
        });
    }

}

function delectDrugList(){
    console.log(arr);
    if(arr.length!=0){
        $.post("/drug/drugdelect",{arr_p:arr},function(data){
//            console.log(data);
            if(data.status == "SUCCEED"){
                $("input[type=checkbox]:checked").parent().parent().remove();
                $("#order-type--alert").find(".am-modal-bd").text("删除成功");
                location.href='/cart/cartprolist';
            }else {
                $("#order-type--alert").find(".am-modal-bd").text("删除失败");
            }
            $('<div class="am-dimmer am-active" data-am-dimmer> </div>').appendTo("body").show();
            $("#order-type--alert").show();
        });
    }else {
        alert("请选择要删除的药品！");
    }
}
function modalDisplay() {
    $('div.am-dimmer').remove();
    $("#order-type--alert").hide();
}

function next(){
    console.log(arr);
    if(arr.length!=0){
        $.post("/drug/drugconfirm",{add_product:arr},function(data){
//                 console.log(data);
            if(data == "SUCCEED"){
                location.href = '/address/addresslist';
            }
        });
    }else {
        $("#order-type--alert").show().find(".am-modal-bd").text("请选择要购买的药品");
        $('<div class="am-dimmer am-active" data-am-dimmer> </div>').appendTo("body").show();
    }
}