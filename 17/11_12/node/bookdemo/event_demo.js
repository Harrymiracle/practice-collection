let util = require('util'),
    eventEmitter = require('events').EventEmitter,
    i = 0;

let Ticker = function() {
    var self = this;
    setInterval(function() {
        i++;
        self.emit('tick');
    }, 1000)
}

util.inherits(Ticker, eventEmitter);

let ticker = new Ticker();

ticker.on('tick', function() {
    console.log('TICK' + i + '!');
})