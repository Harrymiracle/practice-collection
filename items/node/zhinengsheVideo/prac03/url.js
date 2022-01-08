const http = require('http');
const urlLib = require('url');


//传true返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象 
//设为 false，则 query 会是一个未解析未解码的字符串。 默认为 false。
//  var st = urlLib.parse('http://www.baidu.com/index.html?name=123&pass=456',true); 
//  console.log(st);
//  console.log(st.pathname, st.query);



http.createServer(function(req,res){
  console.log(req.url);

  var obj = urlLib.parse(req.url,true);
  
  var url = obj.pathname;
  var GET = obj.query;
    
  console.log(url, GET);

  res.write('aaa');
  res.end();
}).listen('8088');
