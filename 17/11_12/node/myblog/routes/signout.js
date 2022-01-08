const express = require('express'),
    router = express.Router(),
    checkLogin = require('../middlewares/check').checkLogin;

//GET /signout 退出登录页面
router.get('/', checkLogin, function(req, res, next) {
    res.send('退出登录');
});

module.exports = router;