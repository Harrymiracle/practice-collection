function testConstructor() {
    console.log('ha~ ha~ haha~~!');
}

let res = new testConstructor();
console.log(typeof res);    // object
console.log(res.constructor === testConstructor);    // true
console.log(res instanceof testConstructor); // true


