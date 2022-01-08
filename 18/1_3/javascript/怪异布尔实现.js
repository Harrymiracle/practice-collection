const num = 2;
const a = {
    num: 0,
    toString: function() {
        console.log(this);
        return this.num += 1;
    }
}
const result = (a == 1 && a == 2 && a == 3);
console.log(result); //true

/**
 * 解析：上面的为什么是true?
 *     a 是一个对象，首先会调用对象的toString方法，此处在对象内重写了Object对象原型的toString方法， 
 * 第一次 a == 1，调用时，对于a，调用toString方法得到1，第二次 a == 2，调用时，对于a，调用toString方法得到2，
 * 第三次 a == 3，调用时，对于a，调用toString方法得到3，都为true，result被赋值为true。
 */