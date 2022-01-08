/**
 * Created by MXH on 2015/7/17.
 */
var request = require("../util/request"),
    signUrl = require("../util/signurl"),
    logger = require("../log/boleLog").boleLog;

var createOrderService = function(args){
    if(!(this instanceof createOrderService)){
        return new createOrderService(args);
    }
};

/**
 * 1、创建订单---选择订单类型
 * order/createOrder
 * @type {taskService}
 */
createOrderService.prototype.selectOrderType = function* (parmas){
    console.log(parmas);
    var url = signUrl("taskService",{},'createOrder');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 2、创建订单---药品检索
 * order/
 * @type {taskService}
 */
createOrderService.prototype.drugSearchAdd = function* (parmas){
    console.log(parmas);
    var url = signUrl("productService",{},'searchProductByName');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 3、创建订单---添加药品
 * order/
 * @type {taskService}
 */
createOrderService.prototype.addDrug = function* (parmas){
    console.log(parmas);
    var url = signUrl("cartService",{},'addCart');
    console.log(url);

    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 4、创建订单---查看购物车商品列表
 * order/
 * @type {taskService}
 */
createOrderService.prototype.getCartList = function* (parmas){
    console.log(parmas);
    var url = signUrl("cartService",{},'getCartList');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 5、创建订单---修改购物车商品
 * order/
 * @type {taskService}
 */
createOrderService.prototype.updateCartProduct = function* (parmas){
    console.log(parmas);
    var url = signUrl("cartService",{},'updateCart');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}


/**
 * 6、创建订单---药品删除
 * order/
 * @type {taskService}
 */
createOrderService.prototype.drugDelect = function* (parmas){
    console.log(parmas);
    var url = signUrl("cartService",{},'removeCart');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 7、创建订单---选择地址
 * order/
 * @type {taskService}
 */
createOrderService.prototype.getAddressList = function* (parmas){
    console.log(parmas);
    var url = signUrl("addressService",{},'getAddressList');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}

/**
 * 8、创建订单---订单确认
 * order/
 * @type {taskService}
 */
createOrderService.prototype.orderConfirm = function* (parmas){
    console.log(parmas);
    var url = signUrl("taskService",{},'updateEmptyOrder');
    console.log(url);
    var result = yield request.transfer({uri:url,method:'post',params:parmas});
    result = result.body;
    return result;
}



module.exports = createOrderService;