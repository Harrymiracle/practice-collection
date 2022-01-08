let num = 123
childNum = Object(num)
console.log(typeof num) // number
console.log(typeof childNum) // object
console.log(Object.prototype.toString.call(num)) // [object Number]
console.log(Object.prototype.toString.call(childNum)) // [object Number]

let str = ''
childStr = Object(str)
console.log(typeof str) // string
console.log(typeof childStr) // object
console.log(Object.prototype.toString.call(str)) // [object String]
console.log(Object.prototype.toString.call(childStr)) // [object String]

let arr = []
childArr = Object(arr)
console.log(typeof arr) // object
console.log(typeof childArr) // object
console.log(Object.prototype.toString.call(arr)) // [object Array]
console.log(Object.prototype.toString.call(childArr)) // [object Array]

let obj = {}
childObj = Object(obj)
console.log(typeof obj) // object
console.log(typeof childObj) // object
console.log(Object.prototype.toString.call(obj)) // [object Object]
console.log(Object.prototype.toString.call(childObj)) // [object Object]



