var log4js = require('log4js');

log4js.configure({
    appenders: {
        production: {
            type: 'dateFile',
            filename: 'demo.log'
        }
    },
    categories: {
        default: { appenders: ['production'], level: 'debug' }
    }
});

var logger = log4js.getLogger();

logger.info('this is a info from index3.js');