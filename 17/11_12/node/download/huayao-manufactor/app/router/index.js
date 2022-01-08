/**
 * Created by ly on 15-7-2.
 */
var router = require("koa-router")(),
    commonService = require("../service/commonService")(),
    loginService = require("../service/loginService")(),
    uid = require('rand-token').uid,
    config = require("../config"),
    log = require("../log/boleLog").boleLog,
    url = require('url');

var fs = require('fs');


/**
 * 进入首页
 */
router.get("/",function* (next){
    var headItems = yield commonService.getNavs("/home");

    //var user = yield loginService.loginByUserName({userSid:"12"});
    //console.log(user);

    var model = {
        layout:false,
        "title" : config.appname,
        "common" : {
            header : {
                items : headItems
            },
            userInfo:this.session.userInfo
        },
        pictureList:[]
    };
    console.log(model)
    yield this.render("index",model);
});

module.exports = router;