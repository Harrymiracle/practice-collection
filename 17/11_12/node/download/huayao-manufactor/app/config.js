/**
 * Created by chenming 2015/11/23.
 */
var fs = require("fs");

var config = {};
var configFs= JSON.parse(fs.readFileSync('app/config.json'));
var nodeEnv = process.env.NODE_ENV || "development";
config.ip = configFs[nodeEnv]["ip"];
config.port = configFs[nodeEnv]["port"];
config.usergroup = configFs[nodeEnv]["usergroup"];
config.appname = configFs[nodeEnv]["appname"];

/**
 * 应用信息
 * @type {{appkey, secretkey}}
 */
config.appinfo = configFs[nodeEnv]["appinfo"];

config.careland = configFs[nodeEnv]["careland"];

config.clientFlag = 1;
/**
 * 后台服务信息
 * @type {{host, userUri}}
 */
config.userService = configFs[nodeEnv]["userService"];  //用户
config.taskService = configFs[nodeEnv]["taskService"];  //订单
config.productService = configFs[nodeEnv]["productService"];  //商品
config.cartService = configFs[nodeEnv]["cartService"];  //购物车
config.addressService = configFs[nodeEnv]["addressService"];  //地址
config.orderdetailService = configFs[nodeEnv]["orderdetailService"];  //订单详情
config.travalService = configFs[nodeEnv]["travalService"];  //订单追踪
config.driveService = configFs[nodeEnv]["driveService"];  //车辆详情
config.commonService = configFs[nodeEnv]["commonService"];  //司机评价标签


/**
 * 日志配置信息
 * @type {{path}}
 */
config.log = configFs[nodeEnv]["log"]

/**
 * 设置session时间
 * @type {{}}
 */
config.sessionTime = configFs[nodeEnv]["sessionTime"];

config.pageSize = configFs[nodeEnv]["pageSize"];

module.exports = config;