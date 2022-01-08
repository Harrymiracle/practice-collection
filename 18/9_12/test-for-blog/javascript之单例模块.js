var myModule = (function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var str = "It's cool!";

    function showArr() {
        console.log(arr.join("-"));
    }

    function showStr() {
        console.log(str);
    }
    return {
        showArr: showArr,
        showStr: showStr
    }
})()

myModule.showArr(); //1-2-3-4-5-6
myModule.showStr(); //It's cool!