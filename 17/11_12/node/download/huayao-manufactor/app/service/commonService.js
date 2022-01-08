/**
 * Created by MXH on 2015/8/4.
 */

var request = require("../util/request"),
    logger = require("../log/boleLog").boleLog;


function CommonService(args){
    //console.log(arguments);
    this.banklist = [];
    if(!(this instanceof CommonService)){
        return new CommonService(args);
    }
}

/**
 * 根据银行ID得到银行相关信息
 * @param bid
 * @returns {}
 */
CommonService.prototype.getBankLogoById = function* (bid){
    var bank = {};
    var banks = [
        {
            name : "中国工商银行",
            bankid : "266",
            icon : "/images/bank/ICBC_OUT.gif"
        },{
            name : "中国农业银行",
            bankid : "267",
            icon : "/images/bank/ABC_OUT.gif"
        },{
            name : "中国银行",
            bankid : "268",
            icon : "/images/bank/BOC_OUT.gif"
        },{
            name : "中国建设银行",
            bankid : "269",
            icon : "/images/bank/CCB_OUT.gif"
        },{
            name : "招商银行",
            bankid : "270",
            icon : "/images/bank/CMB_OUT.gif"
        },{
            name : "浦发银行",
            bankid : "271",
            icon : "/images/bank/pf.jpg"
        },{
            name : "光大银行",
            bankid : "272",
            icon : "/images/bank/CEB_OUT.gif"
        },{
            name : "平安银行",
            bankid : "273",
            icon : "/images/bank/SPABANK_OUT.gif"
        },{
            name : "华夏银行",
            bankid : "274",
            icon : "/images/bank/hx.jpg"
        },{
            name : "兴业银行",
            bankid : "275",
            icon : "/images/bank/CIB_OUT.gif"
        },{
            name : "中信银行",
            bankid : "276",
            icon : "/images/bank/CITIC_OUT.gif"
        },{
            name : "邮政储蓄银行",
            bankid : "277",
            icon : "/images/bank/yz.jpg"
        },{
            name : "民生银行",
            bankid : "279",
            icon : "/images/bank/CMBC_OUT.gif"
        },{
            name : "广发银行",
            bankid : "280",
            icon : "/images/bank/GDB_OUT.gif"
        },{
            name : "交通银行",
            bankid : "281",
            icon : "/images/bank/COMM_OUT.gif"
        }
    ];
    var bank = {
        name : "",
        bankid : "",
        icon : ""
    };
    for(var i = 0; i < banks.length; i++){
        if(banks[i].bankid == bid){
            var bank = banks[i];
            break;
        }
    }
    return bank;
};

/**
 * 得到导航栏列表，根据url设置当前导航栏项，没有默认设置第一个
 * @param url
 * @returns {*[]}
 */
CommonService.prototype.getNavs = function* (url){
    var navs = [
        {
            name : "零钱袋",
            url : "/",
            pattern : "/home",
            icon : "co-icon-home"
        },{
            name : "投资理财",
            url : "/borrow",
            pattern : "/borrow",
            icon : "co-icon-borrow"
        },{
            name : "账户中心",
            url : "/account",
            pattern : "/account",
            icon : "co-icon-account"
        },{
            name : "财经内参",
            url : "/news/1",
            pattern : "/news",
            icon : "co-icon-news"
        },{
            name : "安全保障",
            url : "/security",
            pattern : "/security",
            icon : "co-icon-security"
        },{
            name : "关于我们",
            url : "/about",
            pattern : "/about",
            icon : "co-icon-about"
        }
    ];
    var activeIndex = 0;
    for(var i = 0; i < navs.length; i++){
        if(url.indexOf(navs[i].pattern) > -1){
            activeIndex = i;
        }
    }
    navs[activeIndex]["isActive"] = true;

    return navs;
};

/**
 * 得到导航栏列表，根据url设置当前导航栏项，没有默认设置第一个
 * @param url
 * @returns {*[]}
 */
CommonService.prototype.getAccNavs = function* (url){
    logger.info(url);
    var navs = [
        {
            name : "账户总览",
            url : "/account/overview",
            type : 1,
            pattern : "/account/overview",
            icon : "/images/bank_icon3.png",
            clsname : "span1"
        },{
            name : "基本信息",
            url : "/account/userinfo",
            type : 1,
            pattern : "/account/userinfo",
            icon : "/images/bank_icon4.png",
            clsname : "span2"
        },{
            name : "我的投资",
            type : 0,
            clsname : "information clear"
        },{
            name : "投资记录",
            url : "/account/tenders/1",
            type : 1,
            pattern : "/account/tenders",
            icon : "/images/bank_icon5.png",
            clsname : "span3"
        },{
            name : "充值记录",
            url : "/account/recharges/1",
            type : 1,
            pattern : "/account/recharges",
            icon : "/images/bank_icon6.png",
            clsname : "span4"
        },{
            name : "提现记录",
            url : "/account/cashs/1",
            type : 1,
            pattern : "/account/cashs",
            icon : "/images/bank_icon7.png",
            clsname : "span5"
        },{
            name : "财友奖励",
            url : "/account/bonus",
            type : 1,
            pattern : "/account/bonus",
            icon : "/images/bank_icon8.png",
            clsname : "span6"
        },{
            name : "账户管理",
            type : 0,
            clsname : "information clear"
        },{
            name : "充　　值",
            url : "/dorecharge",
            type : 1,
            pattern : "/dorecharge",
            icon : "/images/bank_icon11.png",
            clsname : "span7"
        },{
            name : "提　　现",
            url : "/docash",
            type : 1,
            pattern : "/docash",
            icon : "/images/bank_icon10.png",
            clsname : "span8"
        }
    ];
    var activeIndex = 0;
    for(var i = 0; i < navs.length; i++){
        if(url.indexOf(navs[i].pattern) > -1){
            activeIndex = i;
        }
    }
    navs[activeIndex]["isActive"] = true;
    return navs;
};

module.exports = CommonService;
