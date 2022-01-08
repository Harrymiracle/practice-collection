var buffer = new Buffer('this is the content of my buffer');
var buffer2 = new Buffer(11);

var targetstart = 0,
    sourcestart = 8,
    sourceend = 19;

buffer.copy(buffer2, targetstart, sourcestart, sourceend);
console.log(buffer2.toString()); //the content


//将utf-8格式的字符串转换成base64格式的字符串
var utf8_st = 'my string';
var b_st = new Buffer(utf8_st);
var base64_st = b_st.toString('base64');
console.log(base64_st); //bXkgc3RyaW5n


var ff = 'Buffer 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 6c 6f 63 61 6c 68 6f 73 74 3a 34 30 30 30 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 ...';
var bf = new Buffer(ff);
var re = bf.toString('base64');
console.log(re);