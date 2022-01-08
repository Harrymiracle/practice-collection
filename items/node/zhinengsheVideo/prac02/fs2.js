const fs = require('fs');

//writeFile(文件名，内容，回调)  写文件
fs.writeFile('bbb.txt','dfgerr sbbbre',function(err){
  console.log(err);
})
