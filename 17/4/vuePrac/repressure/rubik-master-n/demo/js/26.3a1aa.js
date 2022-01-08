webpackJsonp([26,29],{234:function(e,c,t){var d=t(0)(t(260),t(350),null,null);e.exports=d.exports},260:function(e,c,t){"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.default={name:"checkboxes",data:function(){return{sel:["red"]}}}},350:function(e,c){e.exports={render:function(){var e=this,c=e.$createElement,t=e._self._c||c;return t("article",[t("h1",[e._v("多选框 Checkbox")]),e._v(" "),t("h2",[e._v("例子")]),e._v(" "),t("h3",[e._v("Basic")]),e._v(" "),t("r-checkbox",{attrs:{id:"check0",selected:e.sel,val:"red",label:"Red"}}),e._v(" "),t("r-checkbox",{attrs:{id:"check1",selected:e.sel,val:"yellow",label:"Yellow 默认选中",checked:"checked"}}),e._v(" "),t("r-checkbox",{attrs:{id:"check2",selected:e.sel,val:"blue",label:"Blue"}}),e._v(" "),t("p",[e._v("\n    已选 "+e._s(e.sel)+"\n  ")]),e._v(" "),t("r-checkbox",{attrs:{id:"checkd",label:"默认选中",checked:"checked"}}),e._v(" "),t("r-checkbox",{attrs:{id:"check-f",label:"选中为填充效果",filled:""}}),e._v(" "),t("r-checkbox",{attrs:{id:"check-i",label:"模糊状态 Indeterminate Style",indeterminate:""}}),e._v(" "),t("h3",[e._v("Disabled")]),e._v(" "),t("r-checkbox",{attrs:{id:"check-d1",label:"Green",disabled:"disabled"}}),e._v(" "),t("r-checkbox",{attrs:{id:"check-d2",label:"Brown",checked:"checked",disabled:"disabled"}}),e._v(" "),t("h3",[e._v("props")]),e._v(" "),e._m(0),e._v(" "),t("Markup",{attrs:{lang:"html"}},[e._v('\n    <r-checkbox id="check0" :selected="selected" :val="\'red\'" label="Red"></r-checkbox>\n    <r-checkbox id="check1" :selected="selected" :val="\'yellow\'" label="Yellow 默认选中" checked="checked"></r-checkbox>\n    <r-checkbox id="check2" :selected="selected" :val="\'blue\'" label="Blue"></r-checkbox>\n  ')]),e._v(" "),t("Markup",{attrs:{lang:"js"}},[e._v("\n    export default {\n      name: 'checkboxes',\n      data(){\n        return {\n          selected: ['red'],\n        }\n      }\n    }\n  ")]),e._v(" "),t("Markup",{attrs:{lang:"html"}},[e._v('\n    <r-checkbox id="checkd" label="默认选中" checked="checked"></r-checkbox>\n    <r-checkbox id="check-f" label="选中为填充效果" filled></r-checkbox>\n    <r-checkbox id="check-i" label="模糊状态 Indeterminate Style" indeterminate></r-checkbox>\n    \n    <r-checkbox id="check-d1" label="Green" disabled="disabled"></r-checkbox>\n    <r-checkbox id="check-d2" label="Brown" checked="checked" disabled="disabled"></r-checkbox>\n  '),t("Markup")],1)],1)},staticRenderFns:[function(){var e=this,c=e.$createElement,t=e._self._c||c;return t("table",{staticClass:"bordered responsive-table"},[t("thead",[t("th",[e._v("属性")]),e._v(" "),t("th",[e._v("说明")]),e._v(" "),t("th",[e._v("类型")]),e._v(" "),t("th",[e._v("默认值")])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("label")]),e._v(" "),t("td",[e._v("label 标签")]),e._v(" "),t("td",[e._v("String")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("id")]),e._v(" "),t("td",[e._v("input[type=checkbox] id 属性，对应 label 标签 for 属性")]),e._v(" "),t("td",[e._v("String")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("name")]),e._v(" "),t("td",[e._v("input[type=checkbox] name 属性")]),e._v(" "),t("td",[e._v("String")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("checked")]),e._v(" "),t("td",[e._v("checkbox 是否选中")]),e._v(" "),t("td",[e._v("Boolean")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("disabled")]),e._v(" "),t("td",[e._v("checkbox 是否可用")]),e._v(" "),t("td",[e._v("Boolean")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("val")]),e._v(" "),t("td",[e._v("input[type=checkbox] 的值 (val会赋值到value中)")]),e._v(" "),t("td",[e._v("String")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("selected")]),e._v(" "),t("td",[e._v("一组 checkbox 的已选项")]),e._v(" "),t("td",[e._v("Array")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("filled")]),e._v(" "),t("td",[e._v("选中状态为填充效果")]),e._v(" "),t("td",[e._v("Boolean")]),e._v(" "),t("td",[e._v("-")])]),e._v(" "),t("tr",[t("td",[e._v("indeterminate")]),e._v(" "),t("td",[e._v("初始化状态为模糊效果")]),e._v(" "),t("td",[e._v("Boolean")]),e._v(" "),t("td",[e._v("-")])])])])}]}}});