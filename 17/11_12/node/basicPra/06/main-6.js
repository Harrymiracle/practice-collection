let fibonacci = function(n, rs1 = 1, rs2 = 1) {
    if (typeof n !== 'number') {
        throw new Error('n should be a Number');
    }
    if (n < 0) {
        throw new Error('n should >= 0');
    }
    if (n === 1 || n === 2) {
        return rs2;
    }
    if (n === 0) {
        return 0;
    }

    return fibonacci(n - 1, rs2, rs1 + rs2);
}

exports.fibonacci = fibonacci;

if (require.main = module) {
    // 如果是直接执行 main.js，则进入此处
    // 如果 main.js 被其他文件 require，则此处不会执行。

    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is', fibonacci(n));
}