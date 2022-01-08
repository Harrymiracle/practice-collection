/**
 * Created by Administrator on 2017/3/12.
 */
function learn(something){
    console.log(something);
}

//函数we有两个参数，第一个是需要处理的数据，第二个是一个回调函数，在we函数中调用callback函数
function we(something, callback){
    something += ' is cool!';       //先对传入的第一个参数进行了处理
    callback(something);        //再调用回调函数处理上面加工过后的第一个参数
}

we('node.js', learn);

we('Harry', function(something){        //回调函数是一个匿名函数
    console.log(something)
});
