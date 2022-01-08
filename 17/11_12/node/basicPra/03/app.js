const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')

let app = new express();

app.get('/', function(req, res, next) {
    superagent.get('https://cnodejs.org/').end(function(err, sres) {
        if (err) {
            return next(err);
        }

        let $ = cheerio.load(sres.text),
            items = [];

        $('#topic_list .topic_title').each(function(ind, el) {
            let $el = $(el);
            items.push({
                title: $el.attr('title'),
                href: $el.attr('href')
            })
        })

        res.send(items);
    })
})

app.listen('8989', function() {
    console.log('app is running at 8989!');
})