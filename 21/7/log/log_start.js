// 旧版的log4js的配置格式是 log4js_2.json中的，无法使用
var log4js = require("log4js");
var log4js_config = require("./log4js.json");
log4js.configure(log4js_config);
// log4js.configure({
//     appenders: { cheese: { type: "file", filename: "./logs/log_file/cheese.log" } },
//     categories: { default: { appenders: ["cheese"], level: "error" } }
// });

console.log("log_start start!");

var LogFile = log4js.getLogger('log_date');

LogFile.trace('This is a Log4js-Test');
LogFile.debug('We Write Logs with log4js');
LogFile.info('You can find logs-files in the log-dir');
LogFile.warn('log-dir is a configuration-item in the log4js.json');
LogFile.error('In This Test log-dir is : \'./logs/log_test/\'');

console.log("log_start end!");