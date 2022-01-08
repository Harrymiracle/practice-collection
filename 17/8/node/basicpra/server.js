var http = require('http')

function start(){
	function onRequest(request,response){
		console.log('Request Received!');
		response.writeHead('200',{'content-type':'text/plain'});
		response.write('This is my first node test!')
		response.end();
	}

	http.createServer(onRequest).listen(8888);

	console.log('Server has started!');
}

exports.start = start;
