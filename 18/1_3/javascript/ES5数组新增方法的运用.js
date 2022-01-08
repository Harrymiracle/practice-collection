//例子一、
var firstColorArray = [
    { color: 'red', abbr: 'R' },
    { color: 'green', abbr: 'G' },
    { color: 'blue', abbr: 'B' },
    { color: 'yellow', abbr: 'Y' },
    { color: 'purple', abbr: 'P' },
    { color: 'orange', abbr: 'O' }
];
var secondColorArray = [
    { color: 'red', abbr: 'R' },
    { color: 'green', abbr: 'G' },
    { color: 'violet', abbr: 'V' },
    { color: 'yellow', abbr: 'Y' },
    { color: 'brown', abbr: 'B' },
    { color: 'cyan', abbr: 'C' }
];

/**
 * 以 abbr 相同为过滤条件，过滤掉第二个数组中包含第一个数组中元素的项
 */
var result = secondColorArray.filter(item => (!(firstColorArray.some(cur => cur.abbr == item.abbr))));
console.log(result); //[{ color: 'violet', abbr: 'V'},{ color: 'cyan', abbr: 'C'}]


/**
 * 以 color和 abbt 同时相同为过滤条件，过滤掉第二个数组中包含第一个数组中元素的项
 */
var result2 = secondColorArray.filter(item => (!(firstColorArray.some(cur => (cur.color == item.color && cur.abbr == item.abbr)))));
console.log(result2); //[ { color: 'violet', abbr: 'V' },{ color: 'brown', abbr: 'B' },{ color: 'cyan', abbr: 'C' }]
/**
 * 上面代码分析：secondColorArray是被过滤的数组，item是当前项，firstColorArray数组中只要有一个项同时满足color和abbr同item的color和abbr相等就被过滤掉。
 */




//例子二、
var baseArray = ['red', 'green', 'blue']; // (3)
var beFilteredArray = [ // (9)
    { color: 'red', abbr: 'R' },
    { color: 'yellow', abbr: 'Y' },
    { color: 'green', abbr: 'G' },
    { color: 'blue', abbr: 'B' },
    { color: 'purple', abbr: 'P' },
    { color: 'orange', abbr: 'O' },
    { color: 'violet', abbr: 'V' },
    { color: 'brown', abbr: 'B' },
    { color: 'cyan', abbr: 'C' }
];

//数组的includes方法是es7的新方法，它包含两个参数，第一个是数组的被包含项，第二个是开始的位置（超过数组长度无效，为负，数组项都能被检测）
var result3 = beFilteredArray.filter(item => (!baseArray.includes(item.color)));
console.log(result3);
//(6) [ { color: 'yellow', abbr: 'Y' },{ color: 'purple', abbr: 'P' }, { color: 'orange', abbr: 'O' },
//{ color: 'violet', abbr: 'V' },{ color: 'brown', abbr: 'B' },{ color: 'cyan', abbr: 'C' } ]