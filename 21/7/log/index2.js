let fs = require('fs');
let options = {
    flags: 'a',     // append模式
    encoding: 'utf8',  // utf8编码
};


// 方法二
let stderr = fs.createWriteStream('./a.log', options);
// 创建logger
let logger = new console.Console(stderr);

// 添加format方法
Date.prototype.format = function (format) {
    if (!format) {
        format = 'yyyy-MM-dd HH:mm:ss';
    }

    // 用0补齐指定位数
    let padNum = function (value, digits) {
        return Array(digits - value.toString().length + 1).join('0') + value;
    };
    // 指定格式字符
    let cfg = {
        yyyy: this.getFullYear(),             // 年
        MM: padNum(this.getMonth() + 1, 2),        // 月
        dd: padNum(this.getDate(), 2),           // 日
        HH: padNum(this.getHours(), 2),          // 时
        mm: padNum(this.getMinutes(), 2),         // 分
        ss: padNum(this.getSeconds(), 2),         // 秒
        fff: padNum(this.getMilliseconds(), 3),      // 毫秒
    };
    return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
        return cfg[m];
    });
}

fs.writeFile('./a.log', '', function (err) {
    if (err) {
        console.log(err);
    }
});
// 真实项目中调用下面即可记录错误日志
var time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
logger.log(`[${time}] 这是一条日志1`);
var time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
logger.log(`[${time}] 这是一条日志2`);
var time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
logger.log(`[${time}] 这是一条日志3`);