/**
 * Created by Administrator on 2017/4/7.
 */

/**
 我们可以像使用任何其他的内置模块一样使用server模块：请求这个文件并把它指向一个变量，其中已导出的函数就可以被我们使用了。
 **/

var server = require("./serviceTwo");

server.start();
