//项目中用到的方法检测
var arr = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 2 }, { a: 1 }]; //一个数组项是对象的数组
arr1 = arr.map(v => v.a); //取出每项的 a 属性，得到一个数组
console.log(arr1); //[ 1, 3, 2, 3, 4, 2, 1 ]
arr2 = arr.map(v => v.a).filter(v => v); //此步骤是多余的
console.log(arr2); //[ 1, 3, 2, 3, 4, 2, 1 ]
arr3 = arr.map(v => v.a).filter(v => v).filter((v, i, l) => l.indexOf(v) == i); //去重
console.log(arr3); //[ 1, 3, 2, 4 ]

arr3 = arr.map(v => v.a).filter((v, i, l) => l.indexOf(v) == i); //v是当前项，i是当前项的索引，l是当前项所属的数组
console.log(arr3); //[ 1, 3, 2, 4 ]



var data = [ //返回的一页的数据
    { id: "1db97911-b3b7-4290-b89b-2b93eefbe32c", mCategory: "d11d7f74-2fcb-4e5f-b339-7d4edcbf82fd", mCode: "0000", mName: "修改后名字", mSpec: "无", mUnit: "8cf170ac-ac33-42ce-95c1-b5065086209c" },
    { id: "e6783631-cca5-417b-9ab1-86c994829a89", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "AT-94", mName: "除味剂AT-94", mSpec: "250ml", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "1dcab098-39f5-437a-a77d-0b290b98e2ff", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "3025", mName: "田纳西3025", mSpec: "无", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "5a955423-7168-401b-815f-58ad1de1d294", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "1247", mName: "白色哑光自喷漆1247", mSpec: "无", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "efc2cc89-f6be-4962-84e6-f6decf4a4cd5", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "S1081", mName: "稀释剂S1081", mSpec: "100ml", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "bb77875f-ebef-4e4d-a597-b1a77f0512bd", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "S1071", mName: "修复乳S1071", mSpec: "100ml", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "47ea00fe-3372-4130-8a60-9507fed9e761", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "S1065", mName: "珠光(咖啡)S1065", mSpec: "100ml", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "da4d057a-92f4-4662-b141-5f0076fb90c7", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "S1064", mName: "珠光(铜棕)S1064", mSpec: "100ml", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "7a309a03-f4e1-4773-9f00-3ac2a4941f07", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "S1063", mName: "珠光(古铜)S1063", mSpec: "100ml", mUnit: "00104435-43cc-42eb-ab1b-91a708b59fe8" },
    { id: "8610e3b6-a5fa-4a01-96c9-a9a1f0529075", mCategory: "3358845e-c92a-4afc-aad9-77d1bf946b60", mCode: "S1062", mName: "珠光(金黄)S1062", mSpec: "100ml", mUnit: "3f735dac-763d-4961-a585-e8052d7ab124" }
];
var mCategory = [ //分类信息
    // { name: "类别1", value: "d11d7f74-2fcb-4e5f-b339-7d4edcbf82fd", code: null, del: false },   //隐藏掉此项以供测试
    { name: "桌子", value: "4830c48f-29cb-4096-9cd4-0bb68dde0baf", code: null, del: false },
    { name: "椅子", value: "780517d5-ddf4-4d47-80f5-05964ff6b8b8", code: null, del: false },
    { name: "五金类", value: "9558b007-3582-49d3-a78b-382edcb8c83a", code: null, del: false },
    { name: "板件类", value: "fc604bb4-61aa-47f6-bcb7-ec0747e046d3", code: null, del: false },
    { name: "材料", value: "3358845e-c92a-4afc-aad9-77d1bf946b60", code: null, del: false },
    { name: "户外家具", value: "ac896a01-660b-4947-a91c-d2202e1a0baf", code: null, del: false }
];
var mUnit = [ //单位信息
    { name: "材料清单维护", value: "7ef99415-3ecc-46c5-acbf-4a32e4597c2a", code: null, del: false },
    { name: "材料清单维护", value: "7ef99415-3ecc-46c5-acbf-4a32e4597c2a", code: null, del: false },
    { name: "555555", value: "41a3c151-bc54-43c2-97ec-a23a796dd9b9", code: null, del: false },
    { name: "33", value: "a7f8954d-97b8-4193-88e3-7a0691504834", code: null, del: false },
    { name: "9999", value: "e0f3d418-24cb-49d3-928b-f3f9422c3067", code: null, del: false },
    { name: "6666", value: "e5d1f75b-3f2e-4fde-b4c2-95dd400ddfee", code: null, del: false },
    { name: "ls03包件单位", value: "8cf170ac-ac33-42ce-95c1-b5065086209c", code: null, del: false },
    { name: "ls03包件单位", value: "7c49daec-c215-424d-b15f-e32eb6779642", code: null, del: false },
    { name: "ls02套件单位", value: "8dc55b95-8cec-415d-8b7d-724191b2f35f", code: null, del: false },
    { name: "ls01产品单位", value: "0b206cdc-04b9-49dd-a199-1b88ca76d6b7", code: null, del: false },
    { name: "张", value: "bfb4f7f0-c16d-49e3-a9cc-905a21ee128b", code: null, del: false },
    { name: "ewrw", value: "3ef3dbc4-edb2-43a3-89da-70aa447f9144", code: null, del: false },
    { name: "tetee", value: "59667a5e-9bfd-45a7-a37c-47ae0f5fd906", code: null, del: false },
    { name: "fdfseeee", value: "b2a69f38-ea83-4704-b2e4-e3c9206659d8", code: null, del: false },
    { name: "897898456165", value: "7063f1ab-4489-4d96-8e08-4b262e9660cb", code: null, del: false },
    { name: "吃", value: "9560e9aa-b849-4743-994f-9432eb33b3f2", code: null, del: false },
    { name: "没说", value: "6c531c49-6e83-4ada-a95b-d0fcfa57a430", code: null, del: false },
    { name: "333“”", value: "e9b3d397-ed1b-4767-a3e9-888105134d5d", code: null, del: false },
    { name: "666", value: "f2303f1b-520e-4a62-baea-6dbafd6423d2", code: null, del: false },
    { name: "1166", value: "1920c217-21e8-49f2-8d34-542f70baa2dd", code: null, del: false },
    { name: "个", value: "3f735dac-763d-4961-a585-e8052d7ab124", code: null, del: false },
    { name: "一张", value: "c5672d44-1095-4122-90b3-fa8a85069285", code: null, del: false },
    { name: "套", value: "00104435-43cc-42eb-ab1b-91a708b59fe8", code: null, del: false },
    { name: "12127", value: "04f8487b-fe64-4aa5-ac71-b15618056926", code: null, del: false },
    { name: "0814", value: "a36c1e97-9671-4f11-a374-b55f6616679d", code: null, del: false },
    { name: "平方米", value: "998fa734-e1f5-4929-a98f-fdab21b702a7", code: null, del: false },
    { name: "组", value: "c7ed30ec-d812-47a8-b22c-190fa1945527", code: null, del: false },
    { name: "套", value: "308b6e9c-af97-4c3c-91ff-a00ce9935d8e", code: null, del: false },
    { name: "件", value: "5c55202a-120d-4243-8f6a-50a8e3289266", code: null, del: false },
    { name: "包", value: "4b1f8e75-413c-4d8c-b0f4-49c60b59433c", code: null, del: false },
    { name: "个", value: "434d3b76-1e8b-4e28-b9f3-8cbc5a7b3f9f", code: null, del: false },
    { name: "千克", value: "e74ddf31-03ba-45dc-b049-4f2856253405", code: null, del: false },
    { name: "立方米", value: "0329926e-acb1-4ecd-923a-6b7dba8b8c16", code: null, del: false },
    { name: "间", value: "d16c711f-9411-40c5-a01e-b7c20dd822e6", code: null, del: false }
];
var mCategoryDel = [], //已删除的分类
    mUnitDel = []; //已删除的单位


//方法一、
var uniqPbillTypeArr = data
    .map(v => v.mCategory)
    .filter((v, i, l) => l.indexOf(v) == i);
console.log(uniqPbillTypeArr); //[ 'd11d7f74-2fcb-4e5f-b339-7d4edcbf82fd', '3358845e-c92a-4afc-aad9-77d1bf946b60' ]

var hasDelItems_1 = uniqPbillTypeArr
    //加上 ! 前是取得的uniqPbillTypeArr数组中在mCategory中有值的项，加上 非（!）就是取得的uniqPbillTypeArr数组中在mCategory中没有值的项
    .filter(v => !mCategory.find(v1 => v1.value == v));
console.log(hasDelItems_1); //[ 'd11d7f74-2fcb-4e5f-b339-7d4edcbf82fd' ]  为隐藏了的那一项的value值    //没隐藏为 []

var hasDelItems = uniqPbillTypeArr
    .filter(v => !mCategory.find(v1 => v1.value == v))
    .map(v => mCategoryDel.find(v1 => v1.value == v)); //取得的上面filter处理后的数组中在mCategoryDel中有值的项
console.log(hasDelItems); //隐藏了为 [ undefined ]      //没隐藏为 []

//优化 方法一 中的代码