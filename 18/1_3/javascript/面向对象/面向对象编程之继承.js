/**
 * 
 * 1、原型链继承
 * 
 */
function SuperType() { //超类构造函数 定义 超类的属性
    this.property = true;
}
SuperType.prototype.getSuperVlue = function() { //超类的原型上定义超类方法
    return this.property;
}

function SubType() { //子类构造函数 定义 子类属性
    this.subProperty = false;
}
SubType.prototype = new SuperType(); //子类的原型被赋值为超类的一个实例，原来存在在超类实例中的属性和方法被继承在子类的原型中了。本质是重写了原型对象。
SubType.prototype.getSubTypeValue = function() { //重写后再在原型上增加方法
    return this.subProperty;
}
var instance = new SubType();
console.log(instance); //SuperType { subProperty: false }
console.log(instance.getSuperVlue()); //true


//确定原型和实例的关系
console.log(instance instanceof SubType); //true
console.log(instance instanceof SuperType); //true
console.log(instance instanceof Object); //true
//同原型模式一样，原型继承在用一个字面量对象重写对象原型时，需谨慎。同时，原型继承也存在共享属性被篡改后影响所有相关对象的问题。




/**
 * 
 * 2、借用构造函数 (存在的问题同构造函数，函数的复用无从谈起。)
 *    将原型链继承和借用构造函数继承的结合在一起，发挥二者的长处实现继承。使用原型链实现实现对原型属性和方法的继承，使用借用构造函数实现实例属性的继承。这样既保证了
 *    原型上定义的方法的复用，又保证了每个实例有自己的属性。
 */
function SuperColor() {
    this.color = ['red', 'blue', 'green'];
}

function SubColor() {
    SuperColor.call(this); //继承了SuperColor
}

var subInstance = new SubColor();
subInstance.color.push('purple');
var superInstance = new SuperColor();
console.log(subInstance.color); //[ 'red', 'blue', 'green', 'purple' ]
console.log(superInstance.color); //[ 'red', 'blue', 'green' ]

//此方法可以传递参数
function fatherP(name) {
    this.name = name;
}

function childP() {
    fatherP.call(this, 'theSon'); //继承了父类
    this.age = 16; //子类的属性
}
var childInstance = new childP();
console.log(childInstance.name); //theSon
console.log(childInstance.age); //16




/**
 * 
 * 3、组合继承（javaScript中常用的继承模式）
 * 
 */
function SuperType3(name) {
    this.name = name;
    this.color = ['red', 'green', 'blue'];
}
SuperType3.prototype.sayName = function() {
    console.log(this.name);
}

function SubType3(name, age) {
    SuperType3.call(this, name); //继承属性   第二次调用超类
    this.age = age;
}
SubType3.prototype = new SuperType3(); //继承方法   第一次调用超类
SubType3.prototype.sayAge = function() {
    console.log(this.age);
}

var instance3_1 = new SubType3('Nicholas', 30);
instance3_1.color.push('cyan');
console.log(instance3_1.color); //[ 'red', 'green', 'blue', 'cyan' ]
instance3_1.sayName(); //Nicholas
instance3_1.sayAge(); //30
var instance3_2 = new SubType3('Harry', 28);
instance3_2.color.push('violet');
console.log(instance3_2.color); //[ 'red', 'green', 'blue', 'violet' ]
instance3_2.sayName(); //Harry
instance3_2.sayAge(); //28




/**
 * 
 * 4、原型式继承
 * 
 */
function object(o) {
    function F() {} //临时构造函数
    F.prototype = o; //将传入的对象作为临时构造函数的原型
    return new F(); //返回临时构造函数的实例。实际上是对传入的对象做了一次浅复制。
}
var person = {
    name: 'Nicholas',
    friends: ['Van', 'Jack', 'Bob']
}
var anotherPerson = object(person);
anotherPerson.name = 'Gred';
anotherPerson.friends.push('Jhon');
var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Harry";
yetAnotherPerson.friends.push('Susan');
console.log(anotherPerson.friends); //[ 'Van', 'Jack', 'Bob', 'Jhon', 'Susan' ]
console.log(yetAnotherPerson.friends); //[ 'Van', 'Jack', 'Bob', 'Jhon', 'Susan' ]




/**
 * 5、类式继承
 *    用Object.create(proto[, propertiesObject])实现   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *    proto新创建对象的原型对象。如果proto参数不是 null 或一个对象，则抛出一个 TypeError 异常。
 *    propertiesObject 可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）
 *    对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
 *  返回值：在指定原型对象上添加新属性后的对象。
 */
function Shape() { //父类
    this.x = 0;
    this.y = 0;
}
Shape.prototype.move = function(x, y) { //父类的方法
    this.x += x;
    this.y += y;
    console.info('Shape moved!');
}

function Rectangle() { //子类继承父类的属性
    Shape.call(this);
}
Rectangle.prototype = Object.create(Shape.prototype); //用Object.create()子类的原型继承父类的原型
Rectangle.prototype.constructor = Rectangle; //将子类原型上的constructor指回子类

var rect = new Rectangle();
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); //Is rect an instance of Rectangle? true
console.log('Is rect an instance of Shape?', rect instanceof Shape); //Is rect an instance of Shape? true
rect.move(1, 1); //Shape moved!




/**
 * 
 * 6、寄生式继承      缺点，不能做到函数复用，因而效率低。
 * 
 */
function createAnotherPerson(origin) {
    var clone = object(origin);
    clone.sayHi = function() {
        console.log('Hi!');
    }
    return clone;
}
var person2 = {
    name: 'Nicholas',
    friends: ['Van', 'Jack', 'Bob']
}
var anotherPerson2 = createAnotherPerson(person2); //基于person2返回的新对象anotherPerson2
anotherPerson2.sayHi(); //Hi!




/**
 * 
 * 7、寄生组合式继承      组合继承有一个缺点就是至少要调用两次超类构造函数，相对不是那么高效。
 * 
 */
//重写 3 中的例子
function inheritPrototype(sub, sup) {
    var prototype = object(sup.prototype); //创建一个超类的副本
    prototype.constructor = sub;
    sub.prototype = prototype;
}

function SuperType4(name) {
    this.name = name;
    this.color = ['red', 'green', 'blue'];
}
SuperType4.prototype.sayName = function() {
    console.log(this.name);
}

function SubType4(name, age) {
    SuperType4.call(this, name); //继承属性   调用超类一次
    this.age = age;
}
inheritPrototype(SubType4, SuperType4); //继承原型上的方法  
SubType4.prototype.sayAge = function() {
    console.log(this.age);
}

var instance4_1 = new SubType4('Nicholas', 30);
instance4_1.color.push('cyan');
console.log(instance4_1.color); //[ 'red', 'green', 'blue', 'cyan' ]
instance4_1.sayName(); //Nicholas
instance4_1.sayAge(); //30

var instance4_2 = new SubType4('Harry', 28);
instance4_2.color.push('violet');
console.log(instance4_2.color); //[ 'red', 'green', 'blue', 'violet' ]
instance4_2.sayName(); //Harry
instance4_2.sayAge(); //28