/**
 * Created by Administrator on 2017/4/7.....
 * **/

/**
 在创建完服务器之后，即使没有HTTP请求进来、我们的回调函数也没有被调用的情况下，我们的代码还继续有效.
 运行它node server.js时，它会马上在命令行上输出“Server has started.”。当我们向服务器发出请求（在浏览器访问http://localhost:8888/ ），
 “Request received.”这条消息就会在命令行中出现。
 **/

var http = require("http");

var onRequest = function(req, res){
    console.log("Request Received.");
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write("Hello node.js!");
    res.end();
}

http.createServer(onRequest).listen("8888", "127.0.0.1", function(){
    console.log("Server has started.");
});

