// 设置数据库
const mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	port:'3306',
	database:'admin'
});
connection.connect();
module.exports=connection;