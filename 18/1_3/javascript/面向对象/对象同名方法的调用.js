var obj = {
    consoleTest: function() {
        console.log('11111');
    },
    consoleTest: function() {
        console.log('2222222');
    }
}
obj.consoleTest(); //2222222    同名属性，后面的会覆盖前面的，此处属性值是一个函数而已。


function outPutNum(count) { //高程P184
    for (var i = 0; i < count; i++) {
        console.log(i); //0 1 2 3 4
    }
    var i; //js会对后面的重复声明视而不见（不过它会执行后续变量声明的初始化）
    console.log(i); //5
}
outPutNum(5);