for (var i = 0; i <= 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, i * 1000)
}

for (var j = 0; j <= 5; j++) {
    (function() {
        setTimeout(function() {
            console.log(j);
        }, j * 1000)
    })()
}

for (var k = 0; k <= 5; k++) {
    (function() {
        var z = k;
        setTimeout(function() {
            console.log(z);
        }, z * 1000)
    })()
}

for (var t = 0; t <= 5; t++) {
    (function(tt) {
        setTimeout(function() {
            console.log(tt);
        }, tt * 1000)
    })(t);
}

for (var s = 0; s <= 5; s++) {
    let ss = s;
    setTimeout(function() {
        console.log(ss);
    }, ss * 1000)
}

for (let x = 0; x <= 5; x++) {
    setTimeout(function() {
        console.log(x);
    }, x * 1000)
}