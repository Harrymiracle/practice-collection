/**
 * Created by LQ
 */
module.exports = {
    moduleName: 'pickBank',
    moduleBody: function (bankId) {
        var map = {
            "266" : {
                name : "中国工商银行",
                bankid : "266",
                icon : "/images/bank/ICBC_OUT.gif"
            },
            "267" : {
                name : "中国农业银行",
                bankid : "267",
                icon : "/images/bank/ABC_OUT.gif"
            },
            "268" : {
                name : "中国银行",
                bankid : "268",
                icon : "/images/bank/BOC_OUT.gif"
            },
            "269" : {
                name : "中国建设银行",
                bankid : "269",
                icon : "/images/bank/CCB_OUT.gif"
            },
            "270" : {
                name : "招商银行",
                bankid : "270",
                icon : "/images/bank/CMB_OUT.gif"
            },
            "271" : {
                name : "浦发银行",
                bankid : "271",
                icon : "/images/bank/pf.jpg"
            },
            "272" : {
                name : "光大银行",
                bankid : "272",
                icon : "/images/bank/CEB_OUT.gif"
            },
            "273" : {
                name : "平安银行",
                bankid : "273",
                icon : "/images/bank/SPABANK_OUT.gif"
            },
            "274" : {
                name : "华夏银行",
                bankid : "274",
                icon : "/images/bank/hx.jpg"
            },
            "276" : {
                name : "兴业银行",
                bankid : "275",
                icon : "/images/bank/CIB_OUT.gif"
            },
            "HighBeamSts" : {
                name : "中信银行",
                bankid : "276",
                icon : "/images/bank/CITIC_OUT.gif"
            },
            "277" : {
                name : "邮政储蓄银行",
                bankid : "277",
                icon : "/images/bank/yz.jpg"
            },
            "279" : {
                name : "民生银行",
                bankid : "279",
                icon : "/images/bank/CMBC_OUT.gif"
            },
            "280" : {
                name : "广发银行",
                bankid : "280",
                icon : "/images/bank/GDB_OUT.gif"
            },
            "281" : {
                name : "交通银行",
                bankid : "281",
                icon : "/images/bank/COMM_OUT.gif"
            },
            "000" : {
                name : "",
                bankid : "000",
                icon : ""
            }
        };

        return (map[bankId] ? map[bankId] : map["000"]);
    }
};