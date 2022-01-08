// 理解 Node.js 里的 process.nextTick() 
// https://www.oschina.net/translate/understanding-process-next-tick

console.log('1');
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
// 1 7 8 6 2 4 5 3 9 11 12 10    我理解的 主要是对process.nextTick理解有误
// 1 7 6 8 2 4 3 5 9 11 10 12    实际的