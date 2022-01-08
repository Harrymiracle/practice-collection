function myModule() {
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
}

var coolMd = myModule();
coolMd.showArr(); //1-2-3-4-5-6
coolMd.showStr(); //It's cool!