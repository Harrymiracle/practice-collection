$("header .head-tab div").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    var index=$(this).index();
    $(".address>ul").eq(index).show().siblings("ul").hide();
});

function  choiceCheckedTake(c,check){
    $(".address").children('.'+c).find("img").attr("src","../views/images/person/icon-check.png");
    $(check).siblings('img').attr("src","../views/images/person/icon-checked.png");
    $("#"+c).val(1);
    if($("#quhuo").val() == 1 && $("#songhuo").val() == 1){
        $(".address .small-btn").show();
    }
}

function next(){
    var a1 = $("input[name=quhuo]:checked").parent().attr("data-sid");
    var a2 = $("input[name=songhuo]:checked").parent().attr("data-sid");
    console.log(a1,a2);
    if(a1 && a2){
        $.post('/address/saveaddress',{start:a1,end:a2},function(data){
//            console.log(data);
            if(data == "SUCCEED"){
                location.href = '/createorder/rendertasksubmit';
            }
        });
    }
}