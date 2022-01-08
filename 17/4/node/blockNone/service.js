/**
 * Created by Administrator on 2017/4/7.
 */

var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response);

        // response.writeHead(200, {"Content-Type": "text/plain"});   //关于response的工作移到route中了
        // var content = route(handle, pathname)
        // response.write(content);
        // response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

