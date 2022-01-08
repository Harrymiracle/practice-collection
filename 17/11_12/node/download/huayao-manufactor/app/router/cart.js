
/**
 * Created by ly on 15-7-10.
 */
var router = require("koa-router")(),
    commonService = require("../service/commonService")(),
    createOrderService = require("../service/createOrderService")(),
    signUrl = require("../util/signurl"),
    config = require("../config"),
    log = require("../log/boleLog").boleLog,
    uid = require('rand-token').uid;

var fs = require("fs"),
    url = require('url');

//购物车商品列表
router.get('/cart/cartprolist', function* (next) {
    var user = this.session.user;
    var params = {
        clientFlag:config.clientFlag,
        userId:user.sid
    }
    var cartlist = yield createOrderService.getCartList(params);
    console.log(cartlist);

    model = {
        layout:false,
        title:"药品确认",
        product:cartlist.data,
        status:cartlist.status
    }

    yield this.render("task/drugcomfirm",model);
});

//修改购物车商品
router.post('/cart/updateproduct', function* (next) {
    var reqBody = this.request.body;
    reqBody.clientFlag = config.clientFlag;
    var params = {
        clientFlag:config.clientFlag,
        sums:reqBody.num,
        cartIds:reqBody.cart
    }
    var updatecart = yield createOrderService.updateCartProduct(params);
    console.log(updatecart);

    this.response.body = updatecart.status;
});


module.exports = router;