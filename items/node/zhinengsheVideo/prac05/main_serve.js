const http = require('http');
const urlLib = require('url');
const fs = require('fs');
const qs = require('querystring');
let users = {};  //{'harry': '123456', 'blue': '456789'}

let server = http.createServer((req,res) => {
  let str = '';

  req.on('data',function(data){
    str += data;
  });

  req.on('end',function(){
    let param = urlLib.parse(req.url, true);
    // console.log(param);

    const url = param.pathname;
    const GET = param.query;
    const POST = qs.parse(str);

    // 访问文件：
    // http://localhost:9000/1.html
    // http://localhost:9000/1.jpg
    //
    // 访问接口：
    // http://localhost:9000/user?act=343&username=harry&psd=123

    //访问接口
    if(url == '/user'){
      switch (GET.act) {
        case 'regist':
          if(users[GET.username]){    //判断用户是否已注册
            res.write('{"ok":false, "msg":"该用户已被注册"}');
          }else{          //插入users
            users[GET.username] = GET.psd;
            res.write('{"ok":true, "msg":"注册成功"}');
          }
          break;
        case 'login':
          if(users[GET.username] == null){     //检查用户是否已存在
            res.write('{"ok":false, "msg":"该用户不存在"}');
          }else if(users[GET.username] != GET.psd){     //检查用户密码
            res.write('{"ok":false, "msg":"用户名或密码有误"}');
          }else{
            res.write('{"ok":true, "msg":"登录成功"}');
          }
          break;
        default:
          res.write('{"ok":false, "msg":"未知的act"}');
      }
      res.end();
    }else{
      //读取文件
      let file_name = './www' + url;
      fs.readFile(file_name, function(err,data){
        if(err){
          res.write('404');
        }else{
          // console.log(data);
          res.write(data);
        }
        res.end();
      });
    }
  });

});

server.listen(9000);
