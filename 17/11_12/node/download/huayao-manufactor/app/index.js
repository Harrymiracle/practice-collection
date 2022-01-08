/**
 * Created by yong.liu on 2015/6/11.
 */
var path = require('path'),
    app = require('koa')(),
    compress = require("koa-compress"),
    session = require('koa-generic-session'),
    redisStore = require('koa-redis'),
    render = require('koa-ejs'),
    jade = require('koa-jade'),
    favicon = require("koa-favi"),
    serve = require('koa-static'),
    staticCache = require('koa-static-cache'),
    bodyParser = require('koa-bodyparser'),
    logger = require('./log/logger'),
    config = require("./config"),
    filter = require("./filter.js");
    //less = require('koa-less');

app.use(compress({
    filter: function (content_type) {
        //return /text/i.test(content_type)
        return true;
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(bodyParser());
app.use(serve(path.join(__dirname, 'assets')));
app.use(serve(path.join(process.cwd(), 'bower_components')));
app.use(staticCache(path.join(__dirname, 'assets'), {
    maxAge: 365 * 24 * 60 * 60
}));
app.use(favicon());
app.keys = ['eyean-session', 'huayao-session'];
app.use(session({
    key : "token",
    //store: redisStore({
    //    //client: config.redis.client,
    //    host: config.redis.hostname,
    //    prot: config.redis.port,
    //    socket: config.redis.socket,
    //    db: config.redis.db,
    //    pass: config.redis.pass
    //}),
    cookie : {
        path: '/',
        httpOnly: true,
        maxage: config.sessionTime,
        rewrite: true,
        signed: true
    },
    ttl : null
}));

render(app, {
 root: path.join(__dirname, 'views'),
 layout: 'template',
 viewExt: 'ejs',
 cache: false,
 debug: true
 });

//使用过滤器
//app.use(filter());

/**
 * 路由列表
 */

app.use(require("./router/index").routes()); //首页
app.use(require("./router/login").routes("login"));    //登录注册
app.use(require("./router/task").routes("task")); //渲染任务
app.use(require("./router/person").routes("person"));    //个人中心
app.use(require("./router/createorder").routes("createorder"));    //创建订单-操作
app.use(require("./router/drug").routes("drug"));    //药品
app.use(require("./router/address").routes("address"));    //药品
app.use(require("./router/cart").routes("cart"));    //药品

module.exports = app;
