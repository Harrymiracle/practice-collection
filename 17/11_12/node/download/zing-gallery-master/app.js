require('events').EventEmitter.prototype._maxListeners = 100; //_maxListeners为EventEmitter原型上的一个内部属性
var resize = require('./lib/resize'),
    cfg = require('./config'),
    express = require('express'),
    //process.env属性返回一个包含用户环境信息的对象 ,在Windows系统下，环境变量是不区分大小写的,下面的方法是在给环境变量新增属性。
    port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
    host = process.env.OPENSHIFT_NODEJS_IP;

var photosPath = './resources/photos';
resize.init(photosPath)

var app = express();
// 设置存放模板文件的目录---任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // 设置模板引擎为 ejs
app.use(express.static(__dirname + '/assets/dist/'));
//Object.assign(target, resource) 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
app.use('/', require('./lib/gallery.js')(Object.assign({
    staticFiles: 'resources/photos',
    urlRoot: '/',
    title: 'Zing Gallery',
    render: false
}, cfg)), function(req, res, next) {
    return res.render('gallery', Object.assign({
        galleryHtml: req.html
    }, cfg));
});


app.listen(port, host);
host = host || 'localhost';
console.log('zing-gallery listening on ' + host + ':' + port);