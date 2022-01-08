const querystring = require('querystring');

function start(response, postData){
	console.log('Request handler "start" was called.');

	var body = '<html><head>'+
			    '<meta http-equiv="Content-Type" content="text/html; '+
			    'charset=UTF-8" />'+
			    '</head>'+
			    '<body>'+
			    '<form action="/upload" method="post">'+
			    '<textarea name="text" rows="20" cols="60"></textarea>'+
			    '<br /><br />'+
			    '<input type="submit" value="Submit text" />'+
			    '</form>'+
			    '</body></html>';

	response.writeHead(200,{'Content-Type': 'text/html'});
	response.write(body);
	response.end();
}

function upload(response, postData){
	console.log('Request handler "upload" was called.');
	response.writeHead(200,{'Content-Type': 'text/plain'});
	//response.write('You have sent: ' + decodeURIComponent(postData) + ' .');

	//把请求的整个消息体传递给了请求路由和请求处理程序。我们应该只把POST数据中，我们感兴趣的部分传递给请求路由和请求处理程序。
	//在这这里，我们感兴趣的其实只是text字段。   
	//下面的更优。
	response.write('You have sent: ' + querystring.parse(postData).text + ' .');
	response.end();
}

exports.start = start;
exports.upload = upload;

