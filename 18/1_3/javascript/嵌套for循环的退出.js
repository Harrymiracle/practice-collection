/*
 *正常的for嵌套，内部的break, continue只会退出内部的for循环。
 */
var num = 0;
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        if (i === 5 && j === 5) {
            break; //95 //10-10
            // continue; //99 //10-10
        }
        num++;
    }
}
console.log(num);
console.log(i + '-' + j);



/*
 *加上label标签的for嵌套，内部的break, continue会退出label指定的for循环。
 */
var num2 = 0;
outerMost2: //label语句标签
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i === 5 && j === 5) {
                break outerMost2; //55  //5-5
                // continue outerMost2; //95 //10-10
            }
            num2++;
        }
    }
console.log(num2);
console.log(i + '-' + j);

var num3 = 0;
outerMost3:
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            for (var k = 0; k < 10; k++) {
                if (i === 5 && j === 5 && k === 5) {
                    break outerMost3; //555 //5-5-5
                    // continue outerMost3; //955 //10-10-10
                }
                num3++;
            }
        }
    }
console.log(num3);
console.log(i + '-' + j + '-' + k);

var num4 = 0;
for (var i = 0; i < 10; i++) {
    outerMost3: for (var j = 0; j < 10; j++) {
        for (var k = 0; k < 10; k++) {
            if (i === 5 && j === 5 && k === 5) {
                break outerMost3; //955     //10-10-10
                // continue outerMost3; //995 //10-10-10
            }
            num4++;
        }
    }
}
console.log(num4);
console.log(i + '-' + j + '-' + k);

var num5 = 0;
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        outerMost3: for (var k = 0; k < 10; k++) {
            if (i === 5 && j === 5 && k === 5) {
                break outerMost3; //995     //10-10-10
                // continue outerMost3; //999 //10-10-10
            }
            num5++;
        }
    }
}
console.log(num5);
console.log(i + '-' + j + '-' + k);