/**
 * Module dependencies. 依赖的模块（处理路由，业务逻辑）
 */
require('./db/firstblood_schema')
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')//手动添加 ejs 以便支持 .html
, mongoose = require("mongoose")
, userlist = require("./db/firstblood_schema.js").userlist;
//实例化 express 并赋值app变量
var app = express();

// all environments 依赖的环境（配置参数）
app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');

//让Ejs支持 html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.static("./"));


//bodyParser 改成 urlencoded 可以忽略一些 Node窗口里的警告
  app.use(express.urlencoded());
//app.use(express.bodyParser());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only 开发模式（检查错误）
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 路由解析
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/lu-you-qing-qiu', routes.luyou);
// firstblood 项目路由
app.get('/login',routes.login);//增加
app.post('/home',routes.home);//提交

//增加
app.get("/create", function(req, res) {
    console.log("create 函数")
    var userlist2 = new userlist({
        user: req.query.add,
        password: req.query.password,
        age: req.query.age
    });
    userlist2.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('存入成功');
        }
    });
    res.send("存入成功！！");

});
//读取
app.get("/read", function(req, res) {
    console.log("读取函数");
    userlist.find({}, function(err, docs) {
        console.log(docs);
        /*对docs进行操作*/
    });

    res.send("读取成功！！");

});
//app.get("/readOne", function(req, res) {
//  console.log("读取单值函数");
//  userlist.findOne({
//      user: req.query.user
//  }, {
//      "id": 1,
//      "_id": 0
//  }, function(err, docs) {
//      if (docs.id === req.query.student_id) {
//          res.send('登录成功');
//          console.log(docs.password);
//      } else {
//          console.log(docs.password);
//          res.send('登录失败');
//      }
//  });

//修改
app.get("/update", function(req, res) {
    console.log("更新函数");
    userlist.update({
        user: "test0"
    }, {
        password: "as1"
    }, function(error) {});
    res.send("更新成功！！");

});
//删除
app.get("/delete", function(req, res) {
    console.log("删除函数");
    console.log('11111:',req.query.password)
    userlist.remove({
        user: req.query.password
    }, function(err) {
        if (err) return handleError(err);
        // removed!
    });
    res.send("删除成功！！");

});

// 创建一个http server 启动端口 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});