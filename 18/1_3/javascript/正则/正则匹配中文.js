var pattern = /[\u4e00-\u9fa5]+/, // 匹配一个或多个中文
    pattern2 = /[\u4e00-\u9fa5]/, //只匹配一个中文
    pattern3 = /[^\u4e00-\u9fa5]+/; // 匹配一个或多个非中文

var string = '我是,中国人。';

var res = pattern.exec(string);
console.log(res); //[ '我是', index: 0, input: '我是,中国人。' ]
var res2 = pattern2.exec(string);
console.log(res2); //[ '我', index: 0, input: '我是,中国人。' ]
var res3 = pattern3.exec(string);
console.log(res3); //[ ',', index: 2, input: '我是,中国人。' ]