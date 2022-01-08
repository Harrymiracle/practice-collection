const express = require('express');

let app = new express();

app.get('/', function(req, res) {
    res.send('我是输出的一段文字。');
})

app.listen(8989, function() {
    console.log('app is listen on port 8989!');
})