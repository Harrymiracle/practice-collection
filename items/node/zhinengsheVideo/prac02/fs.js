const fs = require('fs');

//readFile(文件名,回调)
fs.readFile('aaa.txt', function(err, data){
  if(err){
    console.log('读取文件失败！')
  }else{
    console.log(data.toString());   //toString 把二进制的data转换成原始内容
  }
});