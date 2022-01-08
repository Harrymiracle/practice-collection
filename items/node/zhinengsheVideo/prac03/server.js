const http = require('http');

http.createServer(function(req,res){
  console.log(req.url);


  var GET = {};
  if(req.url.indexOf('?') != -1){
    var arr = req.url.split('?');
    //arr[0]=>地址     '/aaa'
    var url = arr[0];
    // arr[1]=>数据   'user=username=harry&password=123456'

    var arr2 = arr[1].split('&');
    for(var i=0; i<arr2.length; i++){
      var arr3 = arr2[i].split('=');

      //arr3[0]=>名字   'username'
      //arr3[1]=>数据   'harry'
      GET[arr3[0]] = arr3[1];
    }
  }else{
    var url = req.url;
  }
  

  console.log(url, GET);


  res.write('aaa');
  res.end();
}).listen('8088');


