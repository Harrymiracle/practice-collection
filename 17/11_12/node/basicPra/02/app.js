const express = require('express')
const utility = require('utility')

let app = new express();

app.get('/', function(req, res) {
    let name = req.query.name;

    let md5value = utility.md5(name);

    res.send(md5value);
})

app.listen('8989', function() {
    console.log('app is running at port 8989!');
})