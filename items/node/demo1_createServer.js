var http = require('http');

function onRequest(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello world!');
	response.end();
}

http.createServer(onRequest).listen('8088');

console.log('Server running at http://127.0.0.1:8088!')