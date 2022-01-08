const async = require('async')

let concurrentcount = 0;

let fetchUrl = function(url, cb) {
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrentcount++;
    console.log('现在并发是：', concurrentcount, ', 正在抓取的是：', url, ',耗时：' + delay + '毫秒。');
    setTimeout(function() {
        concurrentcount--;
        cb(null, url + ' html content');
    }, delay);
}

let urls = [];
for (let i = 0; i < 15; i++) {
    urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function(url, cb) {
    fetchUrl(url, cb);
}, function(err, result) {
    console.log('final: ');
    console.log(result);
});