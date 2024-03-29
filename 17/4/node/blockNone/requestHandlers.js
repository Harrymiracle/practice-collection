/**
 * Created by Administrator on 2017/4/7.
 */
/**
 var exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called.");

    exec("ls -lah", function(error, stdout, stderr){
    	response.writeHead(200, {"Content-Type": "text/plain"});
    	response.write(stdout);
    	response.end();
    });
}

function upload(response) {
    console.log("Request handler 'upload' was called.");
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload!");
    response.end();
}

exports.start = start;
exports.upload = upload;
**/


var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("find /",    //使用更耗时的find
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(stdout);
      response.end();
    });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
