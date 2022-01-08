var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

life.setMaxListeners(11);

function water(who) {
    console.log('给 ' + who + ' 倒水。');
}

life.on('求安慰', water)

life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 洗脚。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 揉肩。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 煮饭。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 添饭。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 洗碗。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 扫地。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' 洗衣服。');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' ……9');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' ……10');
})
life.on('求安慰', function(who) {
    console.log('给 ' + who + ' ……11');
})


life.on('求溺爱', function(who) {
    console.log('给 ' + who + ' 交工资。');
})
life.on('求溺爱', function(who) {
    console.log('给 ' + who + ' 买衣服。');
})


life.removeListener('求安慰', water);
console.log(life.listeners('求安慰').length);
console.log(EventEmitter.listenerCount(life, '求安慰'));
console.log(EventEmitter.listenerCount(life, '求玩坏'));
life.removeAllListeners('求安慰');


var hascomfer = life.emit('求安慰', '大爷');
var hasloved = life.emit('求溺爱', '妹子');
var hasplayed = life.emit('求玩坏', '大爷和妹子');

console.log(hascomfer);
console.log(hasloved);
console.log(hasplayed);