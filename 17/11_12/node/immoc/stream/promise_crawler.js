let http = require('http'),
    promise = require('promise'),
    cheerio = require('cheerio');

const imoocUrl = 'http://www.imooc.com/learn/348';

function filterChapter(html) {
    let $ = cheerio.load(html);
    let chapters = $('.chapter');

    // [{
    //     chapterTitle: '',
    //     videos: {
    //         title: '',
    //         id: ''
    //     }
    // }]

    let courseData = [];

    chapters.each(function(item) { //不能用箭头函数，箭头函数内的this指向运行时的对象
        let chapter = $(this),
            //去除中部空格
            chapterTitle = chapter.find('strong').clone().children().remove().end().text().trim(),
            // chapterTitle = chapter.find('strong').text().trim(), //之去除了两头空格
            videos = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };

        videos.each(function(item) {
            let video = $(this).find('.J-media-item'),
                videoTitle = video.clone().children().remove().end().text().trim(), //去除中部空格
                // videoTitle = video.text().trim(),    //之去除两头空格
                videoId = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                videoTitle: videoTitle,
                videoId: videoId
            })
        })
        courseData.push(chapterData);
    });
    return courseData;
}

function printCourseInfo(courseData) {
    courseData.forEach(function(item) {
        let chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');
        item.videos.forEach(function(video) {
            console.log('   【' + video.videoId + '】' + video.videoTitle);
        })
    })
}

function getPageAsync() {
    return new promise(function(resolve, reject) {
        console.log('正在爬取' + imoocUrl);

        http.get(imoocUrl, function(res) {
            let html = '';

            res.on('data', function(data) {
                html += data;
            });

            res.on('end', function() {
                resolve(html);
                // let courseData = filterChapter(html);
                // printCourseInfo(courseData);
            })
        }).on('error', function(error) {
            reject(error);
            console.log('获取课程数据出错！');
        });
    });
}

promise.all([])
    .then(function(pages) {

    });