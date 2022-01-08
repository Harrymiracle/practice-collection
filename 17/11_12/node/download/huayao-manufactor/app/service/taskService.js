/**
 * Created by MXH on 2015/7/17.
 */
var request = require("../util/request"),
    signUrl = require("../util/signurl"),
    logger = require("../log/boleLog").boleLog;

var taskService = function(args){
    if(!(this instanceof taskService)){
        return new taskService(args);
    }
};

/**
 * 1、任务列表
 * order/list
 * @type {taskService}
 */
taskService.prototype.taskListByuserId = function* (parmas){
    console.log(parmas);
    var url = signUrl("taskService",{},'list');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 2、1 订单详情--药品详情
 * product/findOnlyProduct
 * @type {taskService}
 */
taskService.prototype.getOrderDetail = function* (parmas){
    console.log(parmas);
    var url = signUrl("orderdetailService",{},'checkOrderDetails');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 2、2 订单详情--承运车辆
 * product/findOnlyProduct
 * @type {taskService}
 */
taskService.prototype.getDriveDetail = function* (parmas){
    console.log(parmas);
    var url = signUrl("driveService",{},'checkCarDetails');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 2、3 订单详情--订单追踪
 * product/findOnlyProduct
 * @type {taskService}
 */
taskService.prototype.getTravalDetail = function* (parmas){
    console.log(parmas);
    var url = signUrl("travalService",{},'getOrderTraval');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 获取评价标签
 */
taskService.prototype.getAssessmentTag = function* (parmas) {
    var url = signUrl("commonService", {}, "getEvaluateLabel");
    console.log(url);
    var result = yield request.transfer({
        uri: url,
        method: 'post',
        params: parmas
    });
    result = result.body;
    return result;
}


/**
 * 3 订单详情--药品详情
 * product/findOnlyProduct
 * @type {taskService}
 */
taskService.prototype.getDrugDetail = function* (parmas){
    console.log(parmas);
    var url = signUrl("productService",{},'findOnlyProduct');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 4 订单详情--删除订单
 * product/findOnlyProduct
 * @type {taskService}
 */
taskService.prototype.deleteOrder = function* (parmas){
    console.log(parmas);
    var url = signUrl("taskService",{},'deleteOrder');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}


module.exports = taskService;