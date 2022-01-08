function setName(obj) {
    console.log(obj === person); //true, obj为一个局部变量，在函数内部person的引用指针被复制给了obj。
    console.log(obj); //{}
    obj.name = 'Nicholas';
    // console.log(person.name); //Nicholas
    console.log(obj); //{name: 'Nicholas'}
}
// var person = new Object();
var person = {};
setName(person);
//console.log(obj); //obj is not defined
console.log(person.name); //Nicholas


function setName2(obj) {
    console.log(obj === person2); //true    obj为一个局部变量，在函数内部person的引用指针被复制给了obj。
    console.log(obj); //{}
    obj.name = 'Nicholas';
    // console.log(person2.name); //Nicholas
    // delete obj.name; //此处若删除obj.name,那么在下面函数外console.log(person2.name) 为undefined
    var obj = new Object(); //此处把obj指向了一个新的对象，断开了同person2的联系
    obj.name = 'Gred';
    console.log(obj); //{name:'Gred'}
    return obj; //返回这个局部变量
}
var person2 = new Object();
var anotherPerson = setName2(person2);
console.log(person2.name); //Nicholas
console.log(anotherPerson); //{name:'Gred'}