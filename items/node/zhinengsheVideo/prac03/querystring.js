const http = require('http');
const querystring = require('querystring');


http.createServer(function(req,res){
  console.log(req.url);

  var GET = {};
  if(req.url.indexOf('?') != -1){
    var arr = req.url.split('?');
    //arr[0]=>地址     '/aaa'
    var url = arr[0];
    // arr[1]=>数据   'user=username=harry&password=123456'

    GET = querystring.parse(arr[1]);
    
  }else{
    var url = req.url;
  }
  

  console.log(url, GET);


  res.write('aaa');
  res.end();
}).listen('8088');


