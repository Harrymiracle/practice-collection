 /**
  * 优先队列
  * 实现方法： enqueue(el), dequeue(), front(), isEmpty(), clear(), size(), print()
  */
 function PriorityQueue() {
     var items = [];

     function QueueElement(el, priority) {
         this.element = el;
         this.priority = priority;
     }

     this.enqueue = function(el, priority) {
         var queueElement = new QueueElement(el, priority);

         if (this.isEmpty()) { //第一个,之前为空
             items.push(queueElement);
         } else {
             var add = false;
             for (var i = 0, len = items.length; i < len; i++) {
                 if (items[i].priority >= queueElement.priority) {
                     items.splice(i, 0, queueElement);
                     add = true;
                     break;
                 }
             };
             if (!add) { //没找到比要加元素优先级更大的
                 items.push(queueElement);
             }
         }
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
         items.forEach(function(e, i) {
             console.log('姓名：' + e.element + '---优先级：' + e.priority);
         });
     };
 }