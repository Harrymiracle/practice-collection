/*
 * GET home page.
 */
var firstblood = require('./../db/firstblood_schema.js');


exports.index = function(req, res) {

	res.render('index', {
		title: 'Express',
	});
}

exports.luyou = function(req, res) {
	res.render('lu-you-ye-mian', {
		title: '“路由”是长这样的！'
	});
}

exports.login = function(req, res) {
	res.render('login', {
		title: 'login'
	});
}

/* home */
exports.home = function(req, res) {
	var query = {
		user: req.body.user,
		password: req.body.password
	};
	console.log(req.body.id)
//	console.log(query)
	firstblood.userlist.count(query, function(err, doc) { 
		//count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
		if(doc == 1) {
			var findResult = firstblood.userlist.find(function(error, result) {
				if(error) {
					res.send(error);
				} else {
					res.render('home', {
						title: '后台',
						status: doc,
						username: query.user,
						adminlist: result,
						date: new Date()
					});
				}
			});
		} else {
			res.render('home', {
				title: '后台',
				status: doc,
			});
			//res.redirect('/');
		}
	});
}

//var MongoClient = require('mongodb').MongoClient;
//var DB_CONN_STR = 'mongodb://localhost:27017/firstblood';    
//var stack = 'test2'
//var delData = function(db, callback) {
////连接到表  
//var collection = db.collection('admins');
////删除数据
//var whereStr = {"user":stack};
//collection.remove(whereStr, function(err, result) {
//  if(err)
//  {
//    console.log('Error:'+ err);
//    return;
//  }     
//  callback(result);
//});
//}
// 
//MongoClient.connect(DB_CONN_STR, function(err, db) {
//console.log("连接成功！");
//delData(db, function(result) {
//  console.log(result);
//  db.close();
//});
//});