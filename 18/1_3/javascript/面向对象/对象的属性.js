/**
 * 对象有数据属性和访问属性。
 * 数据属性：包含一个数据值的位置。在这个位置可以读取和写入值。4个描述其行为的特性：
 *   [[Configurable]]:能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。
 *   [[Enumerable]]:能否通过for-in循环返回属性。
 *   [[Writable]]:能否修改属性的值。
 * 以上3个特征如果是在像对象字面量方式的定义的对象中时，默认值都是true。
 *   [[Value]]:这个属性的数据值。读取属性值时从这个位置读取，写入属性值时把新值保存在这个位置。默认是undefined.
 */


/**
 * 要修改默认的特性，需要使用ES5的Object.definedProperty()方法，这个方法接受3个参数，分别是：属性所在对象、属性的名字和一个描述对象。
 * 描述对象必须是以上4个描述其行为的特性中的特性。设置一个或是多个值可以修改对应的特性值。
 */
var person = {};
Object.defineProperty(person, 'name', {
    writable: false, //设置为不能修改
    value: 'Nicholas'
});
console.log(person.name); //Nicholas
person.name = 'Gred'; //试图修改 无效  严格模式下会报错
console.log(person.name); //Nicholas


var person = {};
Object.defineProperty(person, 'name', {
    configurable: false, //设置为不可删除
    value: 'Jack'
});
console.log(person.name); //Jack
delete person.name; //试图删除 无效  严格模式下会报错
console.log(person.name); //Jack


var person = {};
Object.defineProperty(person, 'name', {
    configurable: false, //把一个属性定义为不可配置，就不能再把它变为可配置。此时再用Object.definedProperty()修改除writable外的特性会导致错误。
    value: 'Lisa'
});
// Object.defineProperty(person, 'name', {  //报错的代码注释掉
//     configurable: true,
//     value: 'Lily'
// });




/**
 * 访问属性：不包含数据值。它包含一对getter和setter函数（这两个函数非必须）。读取时调用getter，负责返回有效的值；
 * 写入时调用setter传入新值，负责决定如何处理数据。有4个特性：
 * [[Configurable]] [[Enumerable]]同数据属性的以上两个属性。
 * [[Getter]]和[[Setter]]分别是在读取和写入属性是调用的函数。默认都是undefined。
 * 访问属性不能直接定义，必须使用Object.definedProperty()来定义。
 */
var book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book, 'year', {
    get: function() {
        return this._year;
    },
    set: function(newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

book.year = 2009; //这是常见的使用访问属性的方法，设置一个属性的值会导致其他属性的值发生变化。
console.log(book.edition); //6



//定义多个属性
var theBook = {};
Object.defineProperties(theBook, {
    _year: {
        writable: true,
        value: 2004
    },
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get: function() {
            return this._year;
        },
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});


//读取属性的特性
//Object.getOwnPropertyDescriptor()方法可以取得给定属性的描述符。
var theBook2 = {};
Object.defineProperties(theBook2, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function() {
            return this._year;
        },
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});

var descriptor = Object.getOwnPropertyDescriptor(theBook2, '_year');
console.log(descriptor.value); //2004
console.log(descriptor.configurable); //false
console.log(typeof descriptor.get); //undefined

var descriptor2 = Object.getOwnPropertyDescriptor(theBook2, 'year');
console.log(descriptor2.value); //undefined
console.log(descriptor2.enumerable); //false
console.log(typeof descriptor2.get); //function