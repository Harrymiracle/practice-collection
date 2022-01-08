// const http = require('http');    //加载http模块

// const hostname = '127.0.0.1';   //127.0.0.1是回送地址，指本地机，一般用来测试使用。
// const port = 3000;   //端口

	//通过createServer创建一个web服务器 
	//监听到来自服务器的请求时调用匿名回调函数，参数包含请求体和响应体
// const server = http.createServer((req, res) => {
//   res.statusCode = 200; 		 //响应状态码
//   res.setHeader('Content-Type', 'text/plain');	//响应头
//   res.end('Hello World\n');		//响应的内容
// });

// server.listen(port, hostname, () => {  //通过listen在3000端口监听请求
//   console.log(`Server running at http://${hostname}:${port}/`);
// });




var http = require('http');   //加载http模块
//通过createServer创建一个web服务器 
//监听到来自服务器的请求时调用匿名回调函数，参数包含请求体和响应体
var server = http.createServer(function (req, res) {   
	res.writeHead(200, {'Content-Type': 'text/plain'});	//返回的状态为200(请求成功)，文本内容为纯文本。
	res.end('Hello World!\n');		//响应的内容
});
server.listen(3000, '127.0.0.1');  //通过listen在3000端口监听请求
console.log('Server running at http://127.0.0.1:3000');
