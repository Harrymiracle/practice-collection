/**
 *  实现方法： append(el), insert(pos,el), removeAt(pos), remove(le), indexOf(el), isEmpty(), clear(), size(), getHead(), toString(), print()
 */
function LinkedList() {
    var Node = function(el) { //创建一个内部用的Node构造函数，用于存将要加入临时元素
        this.element = el;
        this.next = null;
    }

    var length = 0, //初始化链表长度
        head = null; //初始化头部元素

    this.append = function(el) {
        var node = new Node(el), //创建该元素
            cur;

        if (length === 0) { //如果长度为 0
            head = node;
        } else { //
            cur = head; //第一个元素为当前项
            while (cur.nex) { //存在下一项
                cur = cur.next; //向后移动一项
            }
            //已到末项
            cur.next = node; //把原来的最后一项指向新元素
        }
        length++; //长度加 1
    };

    this.removeAt = function(pos) {
        if (pos > -1 && pos < length) {
            var cur = head, //第一个元素为当前元素
                pre,
                index = 0;

            if (pos === 0) { //移除的是第一项
                head = cur.next; //当前元素(头部元素)的下一个为第一个元素
            } else {
                while (index++ < pos) { //下一个索引值小于给定位置，向后移动一个元素（移动cur）
                    pre = cur;
                    cur = cur.next;
                }
                pre.next = cur.next;
            }
            length--;
            return cur.element;
        }
        return null;
    };

    this.insert = function(pos, el) {
        var node = new Node(el),
            cur = head,
            index = 0,
            pre;

        if (pos >= 0 && pos <= length) {
            if (pos === 0) { //在第一个位置插入
                node.next = cur; //先建立新元素指向下一个元素的指针（当前元素）
                head = node; //把新元素赋值为头部元素，return后cur就不存在了，可以不处理
            } else {
                while (index++ < pos) { //下一个索引值小于给定位置，向后移动一个元素（移动cur）
                    pre = cur;
                    cur = cur.next;
                }
                node.next = cur;
                pre.next = node;
            }
            length++;
            return true;
        }
        return false;
    };

    this.remove = function(el) {

    };

    this.indexOf = function(el) {

    };

    this.isEmpty = function() {
        return this.length == 0;
    };

    this.size = function() {
        return length;
    };

    this.getHead = function() {
        return head;
    };

    this.toString = function() {

    };

    this.print = function() {

    };
}