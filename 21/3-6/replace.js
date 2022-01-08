// 参考 
// https://www.cnblogs.com/idiv/p/8442046.html
// https://www.w3school.com.cn/js/jsref_replace.asp

// 本例提供的代码来确保匹配字符串大写字符的正确：
let text = "javascript Tutorial";
let txt = text.replace(/javascript/i, "JavaScript");
console.log(txt);


// 在本例中，我们将把 "Doe, John" 转换为 "John Doe" 的形式：
let n = "Doe   ,  John";
let nn = n.replace(/(\w+)\s*,\s*(\w+)/, "$2 $1");
console.log(nn);


// 所有的花引号替换为直引号：
let e = '"aa", "ab" , "bb"';
let ee = e.replace(/"([^"]*)"/g, "'$1'");
console.log(ee);


// 使用字符串作为参数:
var st = 'abcdefg';
var reg1 = /(c)de/g;
st = st.replace(reg1, '$$d'); //这里括号包裹的c被$替换了，然后再替换整个匹配到的cde
console.log(st);



// 把字符串中的单词首字母大写, 可以进行如下操作
let str = 'hello world 000 ___',
    reg = /(\w)(\w*)/g;
let res = str.replace(reg, function (match, p1, p2, offset, str) {
    console.log('match:', match, 'p1:', p1, 'p2:', p2, 'offset:', offset, 'str:', str);
    return p1.toUpperCase() + p2;
});
console.log('res:', res);

// 把字符串中的单词首字母大写, 可以进行如下操作
let s = 'aaa bbb ccc 000 ___';
let ss = s.replace(/\b\w+\b/g, function (word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
});
console.log(ss);







// 掩码手机号
// 假设我们有一个手机号
let tel = '13194099515',
	r = '',
	tmp = '****';
// 方法1:
r = tel.replace(/\d{4}(?=\d{4}$)/g, tmp);			// 第一个参数是正则(正则表示匹配末尾的四个数字前的4个数字)
console.log(r);

// 方法2: 
r = tel.replace(/(\d{3})(\d{4})/g, '$1' + tmp);	// 第一个参数是正则
console.log(r);

// 方法3:
r = tel.replace(tel.slice(3, -4), tmp);			// 第一个参数是字符串
console.log(r);

// 方法4:
r = tel.replace(/(\d{3})(\d{4})(\d{4})/g, function(match, p1, p2, p3) {
	return p1 + tmp + p3;
});
console.log(r);
