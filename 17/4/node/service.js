/**
 * Created by Administrator on 2017/4/7.
 */
var http = require("http");

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("HELLO WORD! \n");
    response.end();
}).listen(8080);
console.log("Service running at http://127.0.0.1:8080");