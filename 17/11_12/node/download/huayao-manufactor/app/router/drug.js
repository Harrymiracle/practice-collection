/**
 * Created by ly on 15-7-10.
 */
var router = require("koa-router")(),
    commonService = require("../service/commonService")(),
    taskService = require("../service/taskService")(),
    createOrderService = require("../service/createOrderService")(),
    signUrl = require("../util/signurl"),
    config = require("../config"),
    log = require("../log/boleLog").boleLog,
    uid = require('rand-token').uid;

var fs = require("fs"),
    url = require('url');

//渲染药品检索
router.get('/drug/drugsearchrender', function* (next) {
    var user = this.session.user;
    var params = {
        clientFlag:config.clientFlag,
        userId:user.sid
    }
    var cartlist = yield createOrderService.getCartList(params);
    console.log(cartlist);
    if(cartlist.status == "SUCCEED"){
        var model = {
            layout:false,
            num:cartlist.data.length
        }
        yield this.render("task/tasksubmitsearch",model);

    }else {
        var model = {
            layout:false,
            num:"?"
        }
        yield this.render("task/tasksubmitsearch",model);
    }
});

//药品检索
router.post('/drug/drugfuzzysearch', function* (next) {
    var reqBody = this.request.body;
    reqBody.clientFlag = config.clientFlag;
    console.log(reqBody);

    var searchresult = yield createOrderService.drugSearchAdd(reqBody);
    console.log(searchresult);

    this.response.body = searchresult;
});

//添加药品
router.post('/drug/adddrug', function* (next) {
    var user = this.session.user;
    var reqBody = this.request.body;

    var productCartDatas = reqBody.productCartDatas;
    var w = "[";
    for(var i=0; i<productCartDatas.length; i++){
        w+= "{productId:"+String(productCartDatas[i].productId)+",";
        w+= "sums:"+100+"},";
    }
    var a = w.substr(0,w.length-1);
    a+= "]";

    var params = {
        clientFlag:config.clientFlag,
        userId:user.sid,
        productCartDatas:a
    }
    var searchresult = yield createOrderService.addDrug(params);
    console.log(searchresult);

    this.response.body = searchresult;
});

//药品删除
router.post('/drug/drugdelect', function* (next) {
    var reqBody = this.request.body;
    var p_id = reqBody.arr_p;
    var cartIds = {
        cartIds: String(p_id),
        clientFlag:config.clientFlag
    }
    console.log(cartIds);

    var delect_r = yield createOrderService.drugDelect(cartIds);
    console.log(delect_r);

    this.response.body = delect_r;
});

//药品确认
router.post('/drug/drugconfirm', function* (next) {
    var reqBody = this.request.body;
    console.log(reqBody.add_product);
    this.session.cartIds = reqBody.add_product;
    console.log(this.session.cartIds);
    this.response.body = "SUCCEED";
});

//药品详情
router.get('/drug/drugdetails', function* (next) {
    var req = this.request.query;
    var params = {
        clientFlag:config.clientFlag,
        productId:parseInt(req.product)
    }
    console.log(params);
    var drugdetail = yield taskService.getDrugDetail(params);

    console.log(drugdetail);
    var model = {
        layout:false,
        title:"药品详情",
        status:drugdetail.status,
        data:drugdetail.data
    }
    yield this.render("task/drugdetails",model);

});


module.exports = router;