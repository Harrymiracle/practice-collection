/**
 * Created by MXH on 2015/7/15.
 * 处理权限拦截，共通错误处理,共同数据处理
 */
//var commonService = require("../common/commonService")();

module.exports = function(){
    return function *(next){
        try {
            //权限拦截,此处以后可用正则进行复杂处理
            //var regExp = /(^\/$)|(^\/error\/?)|(^\/login\/?$)|((^\/login\/loginByUserName\/?$))/;//不是以/,/error或者/login都要检查session存在
            //var regExp = /(^\/error\/?)|((^\/login(\/\w*)*$))|((^\/verifycode(\/\w*)*$))|(^\/news(\/\w*)*$)/;
            var regExp = /((^\/$))|(^\/error\/?)|((^\/login(\/\w*)*$))|(^\/register(\/\w*)*$)/;
            if(!regExp.test(this.originalUrl) && (!this.session || !this.session.user)){
                this.redirect("/login");
            }else{
                yield next;
                if(404 === this.status){
                    this.status = 404;
                    this.body = "<img src=\"/images/fishy4.png\">";
                }
            }
        } catch (err) {
            if("user.0032" === err.message){
                this.session = null;
                this.redirect("/login");
            }else{
                this.status = err.status || 500;
                if(!err.code){
                    err.code = "，出错啦！";
                    err.message = "请与系统客服联系！";
                }
                yield this.render("/error/500", {layout : false,code : err.code,message: err.message},true);
            }
            this.app.emit('error', err, this);
        }

    }
};
