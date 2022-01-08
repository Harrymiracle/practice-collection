var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
app.use(express.static('public'));
app.listen(8787, (err, res) => {
    console.log("\nlisten at port 8787");
})