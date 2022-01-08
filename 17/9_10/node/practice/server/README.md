# 新建一个server文件夹，再在文件夹中建一个server.js文件，在其中输入以下代码：
    var express = require('express');
    var fs = require('fs');
    var path = require('path');
    var app = express();
    app.use(express.static('public'));
    app.listen(8787, (err, res) => {
        console.log("\nlisten at port 8787");
    })

# 点击快捷键ctrl + ~， 运行cnpm init后运行cnpm install express，再运行cnpm install express --save

#新建一个public文件在根目录，把build后的文件粘贴到public文件夹中，运行node server.js