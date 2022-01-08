var log4js = require('log4js');

log4js.configure({
    appenders: {
        production: {
            type: 'dateFile',   // 日志输出类型
            filename: 'demo.log',   // 日志文件的路径，注意这里是路径而不是文件名
            alwaysIncludePattern: true, // 日志文件是否始终展示预设的pattern
            keepFileExt: true,  // 日志文件是否始终保持后缀，默认为false
            daysToKeep: 30 // 日志保存的时间。单位为天。默认值为0，表示一直保存。
        }
    },
    categories: {
        default: { appenders: ['production'], level: 'debug' }
    }
});

var logger = log4js.getLogger();

logger.info('this is a info from index4.js');