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

//取送货地址
router.get('/address/addresslist', function* (next) {
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

    console.log(address_qu,address_song);
    this.session.qu_list = address_song.data;
    this.session.song_list = address_song.data;

    var model= {
        layout:false,
        address_qu:address_qu,
        address_song:address_song
    }

    yield this.render("task/address",model);
});

//保存地址
router.post('/address/saveaddress', function* (next){
    var reqBody = this.request.body;
    console.log(this.session.create_order);
    console.log(this.session.cartIds);
    console.log("------------------------");
    this.session.addressStartId = reqBody.start;
    this.session.addressEndId = reqBody.end;

    console.log( this.session.addressStartId,this.session.addressEndId);
    this.response.body = "SUCCEED";
});



module.exports = router;