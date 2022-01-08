/**
 * Created by rita on 2017/6/3.
 */
/*单选按钮切换选中状态*/
switchSelect();
function switchSelect(){
    $('#sport').click(function(){
        if ($('#sport').attr("checked")) {
            $('#sport').attr("checked",false);
            $('.login_radio label').removeClass("checked");
        }else{
            $('#sport').attr("checked","checked");
            $('.login_radio label').addClass("checked");
        }
    });
};

function checkMobile(){ 
    var sMobile = $("#photonum").val();
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
        alert("不是完整的11位手机号或者正确的手机号前七位"); 
        $("#photonum").focus(); 
        return false; 
    } 
} 

//mobile register
function registerPwdgoToNext(){
    checkMobile();
    var val = $("#photonum").val();
    var state = $("body").attr("state");
    if(val!=null && val!="" && val!=undefined){
        if(state == "0"){
            $.post('/login/registerbyphone',{"phone": val},function(data){
                if(data == "SUCCEED"){
                    location.href = "/login/registerpassword";
                }else{
                    alert("注册失败！");
                }
            });
        }
    }
}

//denglu
function loginGetNext(){
    $.post("/login/loginByUserName",{loginUser: $("#username").val(),password: $("#password").val()},function(data){
        console.log(data);
        if(data.status){
            if(data.status == 'SUCCEED'){
                window.location.href="../views/guidePage.html";
            }
            if(data.status == 'FAILED'){
                if(data.errorMessage == "UNKNOWN USER"){
                    alert("该用户名未注册！");
                }else {
                    alert("用户名或密码输入错误，请重新输入！");
                }
            }
        }else {
            alert("登录失败，请重新登录！");
        }
    });
}

//shezhi pwd
function registerConfirmPwd(){
    var newpwd = $("#newpwd").val();
    var conpwd = $("#conpwd").val();
    if(newpwd === conpwd){
        $.post("/login/registerpassword",{"password": newpwd},function(data){
//                console.log(data);
            if(data == 'SUCCEED'){
                location.href = "/login/perfectdata";
            }else {
                alert("密码设置失败！");
            }
        });
    }else{
        alert("两次密码不一致！");
    }
}

