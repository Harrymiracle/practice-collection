/**
 * Created by ly on 15-7-10.
 */
var router = require("koa-router")(),
    commonService = require("../service/commonService")(),
    loginService = require("../service/loginService")(),
    signUrl = require("../util/signurl"),
    config = require("../config"),
    log = require("../log/boleLog").boleLog,
    uid = require('rand-token').uid;

var fs = require("fs"),
    url = require('url');


/* GET home page. */
router.get('/person/person', function* (next) {
    var user = this.session.user;

    var model = {
        layout:false,
        "title": "个人中心",
        "user": user
    }
    yield this.render('person/personcenter',model);
});


module.exports = router;