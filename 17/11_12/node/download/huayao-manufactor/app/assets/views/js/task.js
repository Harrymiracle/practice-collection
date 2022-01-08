function delectThisCountDownOrder(del){
    event.stopPropagation();
    $('<div class="am-dimmer am-active" data-am-dimmer> </div>').appendTo("body").show();

    $('<div id="order-type--alert">'+
        '<div class="am-modal-dialog">'+
        '<div class="am-modal-bd">你确定要删除这条任务吗？</div>'+
        '<div class="am-modal-footer">'+
        '<span class="am-modal-btn">取消</span>'+
        '<span class="am-modal-btn" data-state="'+del+'">确定</span>'+
        '</div>'+
        '</div>'+
        '</div>').appendTo(".task");
}

$(".task").delegate(".am-modal-btn","click",function () {
    if ($(this).text()=="确定") {
        var order = $(this).attr("data-state");
        console.log(order);
        $.post('/task/orderdelete',{orderId:order},function(data){
            console.log(data);
            if(data.status == "SUCCEED"){
                $("#order"+order).remove();
            }else {
                alert("订单删除失败！");
            }
        });
    }else if ($(this).text()=="取消") {
        $('div.am-dimmer').remove();
        $("#order-type--alert").remove();
    }
    $('div.am-dimmer').remove();
    $("#order-type--alert").remove();
});

function countDown(ele) {
    //获取倒计时的span
    var $countDownSpan = ele.find("span.count-down");
    //获取创建时间
    var createTimeStamp = parseInt($countDownSpan.data("date"));
    //获取本地时间
    var localTimeStamp = new Date().getTime();

    var countDownNum = localTimeStamp - createTimeStamp;
    console.log(createTimeStamp,localTimeStamp,countDownNum);

    var timeKey = setInterval(function() {
        //倒计时
        countDownNum += 1000;
        //如果本地时间戳比创建时间大30W毫秒，new Date(parseInt((300000 - countDownNum/1000))).getTime()
        $countDownSpan.text(parseInt((300000 - countDownNum)/1000)) ;
        if(countDownNum >=300000) {
            //停止倒计时
            ele.text("派单中");

            //console.log(start,end);
            $(ele).parent().siblings(".one").remove();
            $(ele).parent().siblings(".two").show();

            clearInterval(timeKey);
        }
    }, 1000);
}

//获取正在倒计时的元素
$(".task ul li.examine div.count-down-wrap").each(function(){
    countDown($(this));
});