// 导出一个声明的变量
export var color = 'red';
export let animal = 'cat';
export const limit = 3;
export const baseAge = 23;

// 导出一个函数
export function sum(a, b) {
    return a + b;
}   

// 导出一个类
export class Person {
    constructor(name, age, profession){
        this.name = name;
        this.age = age;
        this.profession = profession;
    }
    setAge(val){
        this.age = val;
    }
    getAge(){
        return this.age;
    }
}

// 先申明一个函数，再导出（后面导出的非默认时候要加上 {} ）
function mult(a, b) {
    return a * b
}

function setColor(val) {
    color = val;
}
export { mult as multiply, setColor };  // 导出时重命名
