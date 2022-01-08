/**
 * Created by MXH on 2015/7/17.
 */
var request = require("../util/request"),
    signUrl = require("../util/signurl"),
    logger = require("../log/boleLog").boleLog;

var LoginService = function(args){
    if(!(this instanceof LoginService)){
        return new LoginService(args);
    }
};
/**
 * 用户通过用户名登录
 * @param parmas
 * @returns {*}
 */
LoginService.prototype.loginByUserName = function* (parmas){
    var url = signUrl("userService",{},'login');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}
/**
 * 用户通过UserId 获得邀请码
 * @param parmas
 * @returns {*}
 */
//LoginService.prototype.getInviteCodeByUserId = function* (parmas){
//    var url = signUrl("userService",parmas,'getInviteCodeByUserId');
//    var result = yield request.transfer({uri:url,method:'get',params:{}});
//    result = result.body;
//    return result;
//}
/**
 *用户注册---设置密码---完善资料
 * @param params
 * @returns {*}
 */
LoginService.prototype.registerByMobile = function* (params){
    console.log(params);
    var url = signUrl("userService",{},'saveUser');
    var result = yield request.transfer({uri:url,method:'POST',params:params});
    result = result.body;
    return result;
}
///**
// * 短信发送验证码
// * @param parmas
// * @returns {*}
// */
//LoginService.prototype.sendVerifyCodeSMS = function* (parmas){
//
//    var url = signUrl("userService",{},'sendVerifyCodeSMS');
//    var result = yield request.transfer({uri:url,method:'POST',params:parmas});
//    result = result.body;
//    return result;
//}
///**
// * 检查手机号码是否已经被注册
// * @param parmas
// * @returns {*}
// */
//LoginService.prototype.checkMobileIsRegistered = function* (parmas){
//
//    var url = signUrl("userService",{},'checkMobileIsRegistered');
//    var result = yield request.transfer({uri:url,method:'POST',params:parmas});
//    result = result.body;
//    return result;
//}
///**
// * 校验验证码
// * @param params
// * @returns {*}
// */
//LoginService.prototype.checkVerifyCode = function* (params){
//
//    var url = signUrl("userService",{},'checkVerifyCode');
//    var result = yield request.transfer({uri:url,method:'POST',params:params});
//    result = result.body;
//    return result;
//}
///**
// * 修改登录密码
// * @param params
// * @returns {*}
// */
//LoginService.prototype.changePassword = function* (params){
//
//    var url = signUrl("userService",{},'changePassword');
//    var result = yield request.transfer({uri:url,method:'POST',params:params});
//    result = result.body;
//    return result;
//}

module.exports = LoginService;
