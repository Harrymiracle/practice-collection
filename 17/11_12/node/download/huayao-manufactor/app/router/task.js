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


//订单列表
router.get('/task/task',function* (next) {
    var user = this.session.user;
    console.log(user);
    var params = {
        userId:user.sid,
        clientFlag:config.clientFlag,
        maxstatus:0,
        notInStatus:"-10,-5"
    }

    var list  = yield taskService.taskListByuserId(params);
    console.log(list);

    var model = {
        layout:false,
        title:"我的任务",
        list:list
    }
    yield this.render("task/task",model);
});

//订单删除
router.post('/task/orderdelete',function* (next) {

    var reqBody = this.request.body;
    reqBody.clientFlag = config.clientFlag;
    console.log(reqBody);

    var result  = yield taskService.deleteOrder(reqBody);

    console.log(result);
    this.response.body = result;
});

/**
 * 获取订单详细信息
 */
router.get("/task/taskdetail", function* (next) {
    var reqBody = this.request.query;
    reqBody["clientFlag"] = config.clientFlag;

    var result = {};
    // 查询
    result.orderInfo = yield taskService.getOrderDetail(reqBody);
    result.carDetail = yield taskService.getDriveDetail(reqBody);
    result.orderRecord = yield taskService.getTravalDetail(reqBody);
    result.assessmentTag = yield taskService.getAssessmentTag(reqBody);

    result.layout = false;
    yield this.render("task/taskdetail", result);
});

/**
 * 评价司机
 */
router.post("/task/assessDriver", function* (next) {
    var reqBody = this.request.body;
    reqBody.userName = "Light";
    //this.session.user.username;
    reqBody.evalId = this.session.user.userId;
    reqBody["clientFlag"] = config.clientFlag;
    var result = yield orderService.assessDriverService(reqBody);
    this.response.body = result.status;

});

//选择订单类型
router.get('/task/selectordertype', function* (next) {

    var model = {
        layout:false,
        title: "选择订单类型",
        check_list: ["仓储订单","物流订单","退换货订单"],
        select_time: ["8","12","24","48","78"]
    }
    yield this.render("task/selectordertype",model);
});

//实时位置
router.get('/task/livedetails', function* (next) {
    var model = {
        layout:false,
        title: "实时位置"
    }
    yield this.render("task/livedetails",model);
    // res.send('<script>location.href = "task/address"</script>')
});

module.exports = router;