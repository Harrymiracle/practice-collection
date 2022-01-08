const http = require('http');

var server = http.createServer(function (req, res) {
  // console.log('有人来了！');
  // console.log(req.url);  
  // res.write('abc');

  switch(req.url){
    case '/1.html':
      res.write('11111');
      break;
    case '/2.html':
      res.write('22222');
      break;
    default:
      res.write('404');
      break;
  }


  res.end();
});

server.listen(8088);