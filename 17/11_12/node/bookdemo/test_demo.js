let assert = require('assert');

let a = true;
assert.ok(a, 'a should be true.');

assert.equal('10', 10);

// assert.equal({ a: 1 }, { a: 1 }); //throw new assert.AssertionError

let b = new Date(),
    c = new Date();
assert.deepEqual(b, c);

assert.deepEqual(/a/gi, /a/ig);


let EventEmitter = require('events').EventEmitter,
    ee = new EventEmitter();
// assert.deepEqual(ee, {}); //throw new assert.AssertionError
assert.strictEqual(Object.keys(ee).length, 0); //throw new assert.AssertionError     AssertionError: 4 === 0