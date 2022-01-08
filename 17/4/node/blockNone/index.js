/**
 * Created by Administrator on 2017/4/7.
 * resource from: http://www.nodebeginner.org/index-zh-cn.html
 */

var server = require("./service");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

/**
 * 将不同的URL映射到相同的请求处理程序上是很容易的：只要在对象中添加一个键为"/"的属性，对应requestHandlers.start即可，
 * 这样我们就可以干净简洁地配置/start和/的请求都交由start这一处理程序处理。
**/

/***  在浏览器中访问http://localhost:8888/start    ***/

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
