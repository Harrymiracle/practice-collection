/**
 * Created by yong.liu on 2015/6/11.
 */
var app = require("./index"),
    http = require("http"),
    config = require("./config");
http.createServer(app.callback()).listen(config.port);
console.log("listening on http://" + config.ip + ":" + config.port);