/**
 * 函数————模块
 * 
 **/
if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function(name, implementation) {
        //this指向调用method的对象，给该对象的原型上增加名为name的方法
        this.prototype[name] = implementation;
        return this;
    };
}
String.method('deentityify', function() {
    var entity = { //私有变量--字符实体表
        'quot': '"',
        'lt': '<',
        'gt': '>'
    }

    //返回deentityify方法
    return function() {
        return this.replace(/&([^&;]+);/g, function(a, b) {
            var r = entity[b];
            return typeof r === 'string' ? r : a;
        })
    }
}()); //立即执行，返回一个函数
console.log('xxx&lt;&quot;&gt;xxx'.deentityify()); //xxx<">xxx

/**
 * 用模式模块产生安全对象
 **/
var serial_maker = function() {
    var prefix = '',
        sequence = 0;

    //返回一个用来生成唯一字符串的对象，包含设置前缀，设置序号，产生字符串的三个方法
    return {
        set_prefix: function(p) {
            prefix = String(p);
        },
        set_sequence: function(s) {
            sequence = s;
        },
        gensym: function() {
            var result = prefix + sequence;
            sequence += 1;
            return result;
        }
    }
}
var sequer = serial_maker();
sequer.set_prefix('Q');
sequer.set_sequence('1000');
var unique = sequer.gensym();
console.log(unique); //Q1000




/**
 * 函数--套用
 * 
 **/
Function.method('curry', function() {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments), //arguments是类数组，没有concat方法，必须使用数组的Array.prototype.slice方法，产生常规的数组
        that = this; //指调用curry方法的函数
    return function() {
        return that.apply(null, args.concat(slice.apply(arguments))); //拼接两次调用的数组为新的数组
    }
})

function add(a, b) {
    return a + b;
}

//函数也是一种值，它允许我们将函数和传递给他的参数相结合，产生一个新的函数。
var add1 = add.curry(1);
var add6 = add1(6);
console.log(add6); //7




/**
 * 函数--记忆
 * memo数组保存已经计算了的结果，将计算结果隐藏在闭包中，当函数被调用时，先查询看是否已计算，若是，立即返回已计算的值；
 * memoizer返回一个在管理memo存储和在需要调用fundamental函数时的shell函数，我们传递了shell函数和该函数的参数给fundamental函数。
 **/
var memoizer = function(memo, fundamental) { //一个构造带记忆功能的函数
    var shell = function(n) { //shell函数主要是判断是否已计算，调用fundamental函数
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    }
    return shell;
}

//使用memoizer定义fibonacci函数，并传递初始memo的值和fundamental函数
var fibonacci = memoizer([0, 1], function(shell, n) {
    return shell(n - 1) + shell(n - 2);
});
console.log(fibonacci(100));

var factorial = memoizer([1, 1], function(shell, n) {
    return n * shell(n - 1);
});
console.log(factorial(100));