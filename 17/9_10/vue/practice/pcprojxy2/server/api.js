// 编写接口
const connection=require('./db');
const express=require('express');
const router=express.Router();
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
router.post('/api/login/selectUser',(req,res) =>  {
	 //这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
	 let newAccount = new models.Login({
	 	 name:req.body.user,
	 	 pwd:req.body.pwd
	 });
    //2.处理
  //查询
var userGet='SELECT * FROM user where name="'+name+'" and ' +'pwd="'+pwd+'"';
connection.query(userGet,function(err,results){
 var data=JSON.stringify(results)
  if(data.length>2){
    res.send('1');//登录成功
  }else{
    res.send('0');//登录失败
  }
}) 
});
module.exports = router;