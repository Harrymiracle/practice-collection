// 链接 firstblood 集合
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/firstblood');
// 链接错误
db.on('error', function(error) {
    console.log(error);
});
// Schema 结构
var Schema = mongoose.Schema;
var userlistScheMa = new Schema({
    user     : String,
    password : String,
    //content  : {type : String},
    //time     : {type : Date, default: Date.now},
    age      : Number,
    name	 : String
});

// 关联 firstblood -> admins 表   表数据有问题，一切都白搭!
exports.userlist = db.model('admins', userlistScheMa);
exports.db = db;
console.log('数据库启动成功！！！！')