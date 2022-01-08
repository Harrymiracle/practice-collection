/**
 * Created by ly on 15-7-10.
 */
var router = require("koa-router")(),
    commonService = require("../service/commonService")(),
    loginService = require("../service/loginService")(),
    signUrl = require("../util/signurl"),
    config = require("../config"),
    log = require("../log/boleLog").boleLog,
    uid = require('rand-token').uid;

var fs = require("fs"),
    url = require('url');

// 用户登录操作
router.get("/login",function* (next){
        var ref = this.request.headers['referer'];
        var headItems = yield commonService.getNavs("/");
        var model = {
            layout:false,
            "title" : "零钱袋-账户中心",
            "common" : {
                "header" : {
                    "items" : headItems
                },
                userInfo:this.session.userInfo
            }
        };
       yield this.render("login/login",model);
});

//渲染注册
router.get('/login/register', function* (next) {
    var model = {
        layout: false,
        title: "注册",
        state: "0"
    }
    yield this.render('login/register',model);
});

//忘记密码
router.get("/login/forgotpwd", function* (next) {
    var model = {
        layout: false,
        title: "找回密码",
        state: "1"
    }
    yield this.render('login/register',model);
});

//渲染设置密码
router.get('/login/registerpassword', function* (next) {
    var model = {
        layout: false
    }
    yield this.render('login/registerpassword',model);
});

//渲染完善资料perfectdata
router.get('/login/perfectdata', function* (next) {
    var model = {
        layout: false
    }
    yield this.render('login/perfectdata',model);
});

/**
 * 用户登录
 */
router.post("/login/loginByUserName",function* (next){

    var reqBody = this.request.body;
    var params = {
        "loginUser": reqBody.loginUser,
        "password": reqBody.password,
        "clientFlag": config.clientFlag
    }

    console.log(params);
    var user=yield loginService.loginByUserName(params);

    console.log(user);
    if(user.status==="SUCCEED"){
        this.session.user=user.user;
    }
    this.response.body = user;
});

//电话号码注册
router.post('/login/registerbyphone', function* (next) {
    var reqBody = this.request.body;
    var params = {
        "phone":reqBody.phone,
        "userId":reqBody.phone,
        "clientFlag":config.clientFlag
    }

    var user=yield loginService.registerByMobile(params);

    console.log(user);
    if(user.status === "SUCCEED"){
        this.session.registerbyphone_sid = user.user.sid;
    }

    this.response.body=user.status;
});

// 设置密码
router.post('/login/registerpassword', function* (next) {
    var reqBody = this.request.body;
    var registerbyphone_sid = this.session.registerbyphone_sid;
    var params = {
        "password":reqBody.password,
        "sid":registerbyphone_sid,
        "clientFlag":config.clientFlag
    }
    var user=yield loginService.registerByMobile(params);

    this.response.body=user.status;
});

//完善资料--上传资料
router.post('/login/perfectdata_confirm', function* (next){
    var reqBody = this.request.body;

    console.log("-------------------------------------");
    console.log(reqBody);
    var perfectdata=yield loginService.registerByMobile(reqBody);
    console.log(perfectdata)
    this.response.body=perfectdata.status;
});


module.exports = router;