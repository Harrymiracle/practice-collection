/**
 *  实现方法： push(el(s)), pop(), peek(), isEmpty(), clear(), size(), print()
 */
function Stack() { //先进后出
    var items = [];

    this.push = function(el) {
        items.push(el);
    };

    this.pop = function() {
        return items.pop();
    };

    this.peek = function() {
        return items[items.length - 1];
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
    }
}