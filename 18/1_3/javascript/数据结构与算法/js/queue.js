/**
 *  实现方法： enqueue(el), dequeue(), front(), isEmpty(), clear(), size(), print()
 */

function Queue() { //先进先出
    var items = [];

    this.enqueue = function(el) {
        items.push(el);
    };

    this.dequeue = function() {
        return items.shift();
    };

    this.front = function() {
        return items[0];
    };

    this.isEmpty = function() {
        return items.length == 0;
    };

    this.clear = function() {
        items = [];
    };

    this.size = function() {
        return items.length;
    };

    this.print = function() {
        console.log(items.toString());
    };
}