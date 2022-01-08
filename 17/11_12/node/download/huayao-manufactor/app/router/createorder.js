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

//选择订单类型
router.post('/createorder/selectordertype', function* (next) {
    var user = this.session.user;
    var reqBody = this.request.body;
    var params = {
        userId:user.sid,
        clientFlag:config.clientFlag,
        orderType:parseInt(reqBody.orderType),
        tarnsport:parseInt(reqBody.tarnsport),
        arrivalDate:reqBody.arrivalDate,
        isLoading:parseInt(reqBody.isLoading)
    }
    var selecttype = yield createOrderService.selectOrderType(params);

    console.log("selecttype.status"+selecttype.status);
    if(selecttype.status == "SUCCESS"){
        this.session.createOrder_sid = selecttype.data.sid;
        this.session.orderType = parseInt(reqBody.orderType);
    }
    this.session.createOrder_sid = selecttype.data.sid;
    this.session.orderType = parseInt(reqBody.orderType);

    this.response.body = selecttype.status;
});

//渲染订单确认
router.get('/createorder/rendertasksubmit', function* (next) {
    var orderType = this.session.orderType;
    var cartIds = this.session.cartIds;
    var startId = this.session.addressStartId;
    var endId = this.session.addressEndId;

    var user = this.session.user;
    var params1 = {
        clientFlag:config.clientFlag,
        userId:user.sid,
        type:2
    }
    var params2 = {
        clientFlag:config.clientFlag,
        userId:user.sid,
        type:1
    }
    var address_qu = yield createOrderService.getAddressList(params1);
    var address_song= yield createOrderService.getAddressList(params2);

    var start,end;
    if(address_qu.status == "SUCCEED"){
        var data = address_qu.data;
        for(var i=0; i<data.length; i++){
            if(data[i].sid == startId){
                start = data[i];
            }
        }
    }
    if(address_song.status == "SUCCEED"){
        var data = address_song.data;
        for(var i=0; i<data.length; i++){
            if(data[i].sid == endId){
                end = data[i];
            }
        }
    }

    var cart_params = {
        clientFlag:config.clientFlag,
        userId:user.sid
    }
    var cart = yield createOrderService.getCartList(cart_params);
    console.log(cart);

    var cartlist = [];
    if(cart.status == 'SUCCEED'){
        var data = cart.data;
        for(var i=0; i<data.length; i++){
            for(var j=0; j<cartIds.length; j++){
                if(cartIds[j] == data[i].sid){
                    cartlist.push(data[i]);
                }
            }
        }
    }

    var all_price = all_weight = all_volume = 0;
    for(var i=0; i<cartlist.length; i++){
        all_price+= Number(cartlist[i].price) * 10;
        all_weight+= Number(cartlist[i].weight) * 10;
        all_volume+= Number(cartlist[i].volume) * 10;
    }

    console.log(all_price,all_weight,all_volume);

    var model = {
        layout:false,
        title: "订单提交",
        orderType:orderType,
        cartlist:cartlist,
        addressStart:start,
        addressEnd:end,
        all_price:all_price,
        all_weight:all_weight,
        all_volume:all_volume
    }
    console.log("111111111111111111111");
    console.log(model);
    yield this.render("task/tasksubmit",model);
});

//订单提交
router.post('/createorder/tasksubmit',function* (next){
    var createOrder_sid = this.session.createOrder_sid;
    var orderType = this.session.orderType;
    var cartIds = this.session.cartIds;
    var  start = this.session.addressStartId;
    var end = this.session.addressEndId;
    console.log(createOrder_sid,orderType,cartIds);

    var productId = "";
    for(var i=0; i<cartIds.length; i++){
        productId+=parseInt(cartIds[i].productId)+",";
    }
    var params = {
        clientFlag:config.clientFlag,
        userId:this.session.user.sid,
        orderId:createOrder_sid,
        orderType:orderType,
        cartIds:String(cartIds),
        addressStartId:parseInt(start),
        addressEndId:parseInt(end)
    }

    var submit = yield createOrderService.orderConfirm(params);
    console.log(submit);
    this.response.body = submit;
});

//实时位置
router.get('/createorder/livedetails', function* (next) {
    var model = {
        layout:false,
        title: "实时位置"
    }
    yield this.render("task/livedetails",model);
    // res.send('<script>location.href = "task/address"</script>')
});

module.exports = router;