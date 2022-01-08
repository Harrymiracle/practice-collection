/**
 * 一般使用Object构造函数和对象字面量都可以创建单个对象。
 * 但在使用Object构造函数时，一个接口创建很多对象会生成大量重复代码。因此就有了如下方法。
 */

//1、工厂模式：可以多次调用这个函数，但没解决对象的识别问题（怎样知道一个对象的类型）
var createPerson = function(name, age, sex) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sex = sex;
    o.say = function() {
        console.log(this.name + ' ' + this.age + ' ' + this.sex); //调用this
    }
    return o;
}
var Jack = createPerson('Jack', 18, 'male');
Jack.say(); //Jack 18 male



//2、构造函数模式：特点--没有显示的创建对象，直接将属性和方法赋值给this，没有return语句，函数的首字母大写。
function CreatePersonTwo(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.say = function() {
        console.log(this.name + ' ' + this.age + ' ' + this.sex);
    }
}
var Tom = new CreatePersonTwo('Tom', 20, 'male'); //任何函数只要通过new操作符调用都是构造函数，构造函数不用new调用时就是普通函数。
Tom.say(); //Tom 20 male

//如此就可以判断对象的类型
console.log(Tom.constructor == CreatePersonTwo); //true
console.log(Tom.coustructor == Object); //false
console.log(Tom instanceof CreatePersonTwo); //true
console.log(Tom instanceof Object); //true
/**
 * 构造函数的问题就是，每个方法都要在实例上重新创建一遍，
 * 如果把方法定义在全局，再在构造函数内部将构造函数的方法赋值为全局的方法可解决前面的问题，
 * 但新问题又出现了，就是会定义很多的全局变量，封装就形同虚设了。
 */



//3、原型模式
function CreatePersonThree() {}
CreatePersonThree.prototype.name = 'Bob';
CreatePersonThree.prototype.age = 22;
CreatePersonThree.prototype.sex = 'male';
CreatePersonThree.prototype.say = function() {
    console.log(this.name + ' ' + this.age + ' ' + this.sex);
}

var personOne = new CreatePersonThree();
personOne.say(); //Bob 22 male
var personTwo = new CreatePersonThree();
personTwo.say(); //Bob 22 male
//在创建实例时并没有传参，以上的输出能相同，因为在构造函数的原型上定义的属性和方法可以为实例共享。
//***原型的获取和检测
console.log(CreatePersonThree.prototype.isPrototypeOf(personOne)); //true
console.log(CreatePersonThree.prototype.isPrototypeOf(personTwo)); //true
console.log(Object.getPrototypeOf(personOne)); //CreatePersonThree { name: 'Bob', age: 22, sex: 'male', say: [Function] }
console.log(Object.getPrototypeOf(personTwo) == CreatePersonThree.prototype); //true

personOne.name = 'Nicolas';
console.log(personOne.name); //Nicolas  ---来自实例，屏蔽了来自原型的同名属性
console.log(personTwo.name); //Bob   ---来自原型
console.log(personOne.hasOwnProperty('name')); //true
console.log(personTwo.hasOwnProperty('name')); //false
delete personOne.name; //删除来自实例的该属性
console.log(personOne.name); //Bob   ---来自原型
console.log(personOne.hasOwnProperty('name')); //false

//***in操作符：无论属性在原型中还是在实例中还是在原型中都返回true
console.log('name' in personTwo); //true

//***写一个方法，能判断一个属性是否在对象的原型中
function hasPrototypeProperty(prop, obj) {
    return prop in obj && !obj.hasOwnProperty(prop);
}
console.log(hasPrototypeProperty('sex', personTwo)); //true


//***取得对象上所有可枚举的实例属性
var keys = Object.keys(CreatePersonThree.prototype);
console.log(keys); //[ 'name', 'age', 'sex', 'say' ]
personOne.name = 'Lisa';
personOne.sex = 'female';
var keysL = Object.keys(personOne);
console.log(keysL); //[ 'name', 'sex' ]  通过实例调用Object.keys()方法只返回了实例上定义的属性组成的数组。

var keysUnum = Object.getOwnPropertyNames(personOne);
console.log(CreatePersonThree.prototype); //CreatePersonThree { name: 'Bob', age: 22, sex: 'male', say: [Function] }  ---第一个为构造函数CreatePersonThree

/**
 * 更简洁的原型模式
 */
function createPersonFour() {}
createPersonFour.prototype = {
    name: 'Frank',
    age: 25,
    sex: 'male',
    say: function() {
        console.log(this.name + ' ' + this.age + ' ' + this.sex);
    }
}
var instanceOfFour = new createPersonFour();
console.log(instanceOfFour instanceof createPersonFour); //true
console.log(instanceOfFour instanceof Object); //true
console.log(instanceOfFour.constructor == createPersonFour); //false
console.log(instanceOfFour.constructor == Object); //true
//此时是用一个对象字面量整体替换了构造函数的原型对象，对象字母量的原型是指向 Object 对象的，此时构造函数的constructor也就指向了Object对象了。
function createPersonFour2() {}
createPersonFour2.prototype = {
    constructor: createPersonFour2, //加上这一行就对了，单会让此属性的[[Enumerable]]属性变成true,原生的constructor的[[Enumerable]]属性为false，可以通过高级属性来改变
    name: 'Frank',
    age: 25,
    sex: 'male',
    say: function() {
        console.log(this.name + ' ' + this.age + ' ' + this.sex);
    }
}
var instanceOfFour2 = new createPersonFour2();
console.log(instanceOfFour2.constructor == createPersonFour2); //true
Object.defineProperty(createPersonFour2.prototype, 'constructor', {
    enumerable: false,
    value: createPersonFour2
})




/**
 * 原型模式的问题、  一个实例改变了原型上的属性的值，会影响到和此实例共享此属性的其他实例。因此就有了
 * 4、组合使用构造函数和原型模式
 *    共享属性和方法用原型模式，实例属性用构造函数模式。
 */
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Lily', 'Susan', 'Jack'];
}
Person.prototype = {
    constructor: Person,
    say: function() {
        console.log(this.name + ' ' + this.age + ' ' + this.job + ' ' + this.friends);
    }
}
var person1 = new Person('Greg', 27, 'engineer');
var person2 = new Person('Nicolas', 30, 'doctor');
person1.friends.push('Jhon');
person1.say(); //Greg 27 engineer Lily,Susan,Jack,Jhon
person2.say(); //Nicolas 30 doctor Lily,Susan,Jack




/**
 * 5、动态原型模式
 */
function People(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    if (typeof this.sayName != 'function') { //在sayName方法不存在的情况下才添加此方法到原型上。只是在初次调用构造函数时才执行，初始化后不需要修改就不会调用。
        People.prototype.sayName = function() {
            console.log(this.name);
        }
    }
}
var star = new People('Aligee', 34, 'singer');
star.sayName(); //Aligee




/**
 * 6、稳妥模式
 */
function People2(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(name); //不调用this
    }
    return o;
}
var Nicolas = People2('Nicolas', 29, 'software engineer');
Nicolas.sayName(); //Nicolas
//除了使用sayName方法没有其他办法可以访问数据成员，即使有办法给对象添加数据成员和方法，但没有办法访问传入到构造函数中的原始数据。