/**
 * Created by Administrator on 2017/4/7.
 */

var http = require("http");

function start(){
    function onRequest(req, res){
        console.log("Request Received!")
        res.setHeader("200",{"Content-Type": "text/plain"});
        res.write("Hello the second try!");
        res.end();
    }

    http.createServer(onRequest).listen("8888", "127.0.0.1", function(){
        console.log("Server has started!")
    })
}

exports.start = start;   //暴露方法 是用exports, 不是export.