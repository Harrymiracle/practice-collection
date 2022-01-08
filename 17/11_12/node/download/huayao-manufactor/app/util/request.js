/**
 * Created by ly on 15-7-10.
 */
var http = require("http"),
    querystring = require("querystring"),
    extend = require("extend"),
    coRequest = require("co-request"),
    request = require('request'),
    messageUtil = require("../util/MessageUtil")(),
    log = require("../log/boleLog").boleLog;

var transmit = function(options,callbak){
    var postData = querystring.stringify(options.postData);
    var configuration = {
        hostname: "",
        port: 80,
        path: "",
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    configuration = extend(true,configuration, options.configuration);

    var req = http.request(configuration, function(res) {
        var resData = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            resData += chunk;
        });
        res.on('end',function(){
            callbak(resData);
        });
    });

    req.on('error', function(e) {
        this.throw(500,"problem with request: " + e.message);
    });

    req.write(postData);
    req.end();
}

/**
 * 自实现的co包装函数
 * @returns {Function}
 */
var dispatch = function(){
    return function(fn){
        request('http://www.baidu.com', fn);
    }
}

/**
 * request的co包装器
 * @returns {*}
 */
function *transfer(options,next){
    var result =  {};
    try{
        result =  yield coRequest({
            uri: options.uri,
            method: options.method,
            form: options.params
        });
        log.info(result.body);
        if(typeof result.body === "string"){
            result.body = JSON.parse(result.body);
        }
    }catch(e){
        result.body = {
            errorCode : "SYS.0000"
        }
    }
    //处理用户token在服务器端过期
    if("user.0032" === result.body.errorCode){
        throw new Error("user.0032");
    }
    if(result.body.errorCode){
        var tmpMessage = messageUtil.getMessage(result.body.errorCode);
        if(tmpMessage){
            result.body.errorMessage = tmpMessage;
        }
        log.error("HTTP REQUEST ERROR:"+tmpMessage);
    }
    return result;
}


/**
 * GET 提交
 * Content-type: application/x-www-form-urlencoded
 * @constructor
 */
function *GET(options){

}

function *ajaxTransfer(options){
    var result =  yield coRequest({
        uri: options.uri,
        method: options.method,
        body : options.params,
        json: true
    });
    log.info(result.body);
    try{
        if(typeof result.body === "string"){
            result.body = JSON.parse(result.body);
        }
    }catch(e){
        result.body = {
            errorCode : "SYS.0000"
        }
    }
    //处理用户token在服务器端过期
    if("user.0032" === result.body.errorCode){
        throw new Error("user.0032");
    }
    if(result.body.errorCode){
        var tmpMessage = messageUtil.getMessage(result.body.errorCode);
        if(tmpMessage){
            result.body.errorMessage = tmpMessage;
        }
    }
    return result
}

module.exports = {
    transmit: transmit,
    dispatch: dispatch,
    transfer: transfer,
    ajaxTransfer : ajaxTransfer
};