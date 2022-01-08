// 一个模块只能导出一个默认值，同时导出多个默认值会报错
// Uncaught SyntaxError: Identifier '*default*' has already been declared

export let constNum = 8;

// 导出一个匿名函数作为默认值
// export default function(a, b){
//     return a * b;
// }

// 先申明一个函数，再将这个函数作为默认值导出
function mult(a, b) {
    return a * b;
}
export default mult;
// export { mult as default };