let a = 1;
let aa = '1';
let b = 2;
let bb = '2';
let c = 0;
let cc = '0';
let dd = '';
console.log(typeof (a + b), a + b); // 3
console.log(typeof (a + bb), a + bb); // '12'
console.log(typeof (aa + b), aa + b); // '12'
console.log(typeof (aa + bb), aa + bb); // '12'
console.log(typeof (a + dd), a + dd); // '1'
console.log(typeof +aa, +aa);   // number 1
console.log(typeof +bb, +bb);   // number 2
console.log(typeof +cc, +cc);   // number 0

let date = new Date();
console.log(Object.prototype.toString.call(date));  // [object Date]
console.log(typeof date, date) // object 2021-08-16T07:54:31.341Z
console.log(typeof +date, +date) // number 1629100471341


let num1 = 3.14;
let sNum1 = '3.14';
let num2 = -3.14;
let sNum2 = '-3.14';
let abc = 'abc';
let bcd = '123bcd';

console.log(Math.floor(num1), Math.floor(~~num2));  // 3 -3
console.log(~~num1, ~~num2);    // 3 -3
console.log(typeof Math.floor(sNum1), typeof Math.floor(~~sNum2));  // number number
console.log(Math.floor(sNum1), Math.floor(~~sNum2));  // 3 -3
console.log(typeof ~~sNum1, typeof ~~sNum2);    // number number
console.log(~~sNum1, ~~sNum2);    // 3 -3
console.log(Math.floor(abc));   // NaN
console.log(~~abc); // 0
console.log(Math.floor(bcd));   // NaN
console.log(~~bcd); // 0


