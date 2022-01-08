/**
 * Created by Administrator on 2017/3/12.
 */
var c = 0;

function log(){
    console.log(c);
}

function add(){
    setTimeout(function(){
        c += 1;
    }, 1000);
}

add();
log();      // 立即打印出 0
//setTimeout是异步线程，需要等待js引擎处理完同步代码（for/while语句）之后才会执行，即使setTimeout为0，他也是等js引擎的代码执行完之后才会插入到js引擎线程的最后执行。
//详情见2月的练习


var d = 0;

function print(){
    console.log(d);
}

function plus(callback){
    setTimeout(function () {
        d += 1;
        print(callback);
    }, 1000);
}

plus(print);        //等一秒打印出 1
