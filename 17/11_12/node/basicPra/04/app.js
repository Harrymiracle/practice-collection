const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')
const url = require('url')

let cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err, res) {
    if (err) {
        return console.error(err);
    }

    let topicUrls = [],
        $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function(ind, el) {
        let $el = $(el),
            $href = url.resolve(cnodeUrl, $el.attr('href'));

        topicUrls.push($href);
    });

    let ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, function(topics) {
        topics = topics.map(function(topicPair) {
            let topicUrl = topicPair[0],
                topicHtml = topicPair[1],
                $ = cheerio.load(topicHtml);

            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
            });
        });

        console.log('final: ');
        console.log(topics);
    });

    topicUrls.forEach(function(topicUrl) {
        superagent.get(topicUrl)
            .end(function(err, res) {
                console.log('fetch ' + topicUrl + 'successful!');
                ep.emit('topic_html', [topicUrl, res.text]);
            })
    })
})