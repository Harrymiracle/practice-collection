webpackJsonp([10,29],{243:function(t,a,e){e(315);var o=e(0)(e(270),e(339),"data-v-5b743d8a",null);t.exports=o.exports},270:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"modals",data:function(){return{txt:"I have to remind myself that some birds don’t mean to be caged . Their feathers are just too bright. And when they fly away, the part of you that knows it was a sin to lock them up. DOES rejoice. Still, the place you live in is that much more drab and empty that they’re gone. I guess I just miss my friend. "}},methods:{modal:function(t){this.$rubik.bridge.pub("modal:close:"+t)}}}},291:function(t,a,e){a=t.exports=e(60)(),a.push([t.i,".btn[data-v-5b743d8a]{margin:10px}.modal-txt[data-v-5b743d8a]{-ms-flex:auto;flex:auto;text-align:center;font-size:1.5rem}","",{version:3,sources:["/./example/views/Modal.vue"],names:[],mappings:"AACA,sBACE,WAAa,CACd,AACD,4BACE,cAAe,AACX,UAAW,AACf,kBAAmB,AACnB,gBAAkB,CACnB",file:"Modal.vue",sourcesContent:["\n.btn[data-v-5b743d8a] {\n  margin: 10px;\n}\n.modal-txt[data-v-5b743d8a] {\n  -ms-flex: auto;\n      flex: auto;\n  text-align: center;\n  font-size: 1.5rem;\n}"],sourceRoot:"webpack://"}])},315:function(t,a,e){var o=e(291);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(228)("d3f5828c",o,!0)},339:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("article",[e("h1",[t._v("对话框 Modal")]),t._v(" "),e("h2",[t._v("例子")]),t._v(" "),e("r-btn",{directives:[{name:"modal",rawName:"v-modal:modalA",arg:"modalA"}],staticClass:"blue white-text"},[t._v("中间弹出")]),t._v(" "),e("r-modal",{attrs:{id:"modalA"}},[e("r-card",[e("r-card-text",[e("p",{staticClass:"txt"},[t._v("\n          "+t._s(t.txt)+"\n        ")])]),t._v(" "),e("r-card-row",{attrs:{actions:"actions"}},[e("r-placeholder"),t._v(" "),e("r-btn",{nativeOn:{click:function(a){t.modal("modalA")}}},[t._v("取消")]),t._v(" "),e("r-btn",{staticClass:"blue white-text",nativeOn:{click:function(a){t.modal("modalA")}}},[t._v("确认")])],1)],1)],1),t._v(" "),e("r-btn",{directives:[{name:"modal",rawName:"v-modal:modalB",arg:"modalB"}],staticClass:"red white-text"},[t._v("顶部弹出")]),t._v(" "),e("r-modal",{attrs:{id:"modalB",top:""}},[e("r-card",{staticClass:"red white-text"},[e("r-card-row",{attrs:{actions:"actions"}},[e("div",{staticClass:"modal-txt"},[t._v("顶部对话框")]),t._v(" "),e("r-btn",{staticClass:"blue white-text",attrs:{large:""},nativeOn:{click:function(a){t.modal("modalB")}}},[t._v("知道了")])],1)],1)],1),t._v(" "),e("r-btn",{directives:[{name:"modal",rawName:"v-modal:modalC",arg:"modalC"}],staticClass:"green white-text"},[t._v("底部弹出")]),t._v(" "),e("r-modal",{attrs:{id:"modalC",bottom:""}},[e("r-card",{staticClass:"green white-text"},[e("r-card-row",{attrs:{actions:"actions"}},[e("div",{staticClass:"modal-txt"},[t._v("底部对话框")]),t._v(" "),e("r-btn",{staticClass:"blue white-text",nativeOn:{click:function(a){t.modal("modalC")}}},[t._v("知道了")])],1)],1)],1),t._v(" "),e("h2",[t._v("API")]),t._v(" "),e("h3",[t._v("指令说明")]),t._v(" "),e("p",[t._v("\n    v-modal 作用在触发modal的元素上\n  ")]),t._v(" "),t._m(0),t._v(" "),e("h3",[t._v("props")]),t._v(" "),t._m(1),t._v(" "),e("Markup",{attrs:{lang:"html"}},[t._v('\n    <r-btn class="green white-text" v-modal:modal="">底部弹出</r-btn>\n    <r-modal id="modal" bottom>\n      <r-card class="green white-text">\n        <r-card-row actions="actions">\n          <div>底部对话框</div>\n          <r-placeholder/>\n          <r-btn class="blue white--text" @click.native="modal(\'modal\')">知道了</r-btn>\n        </r-card-row>\n      </r-card>\n    </r-modal>\n  ')])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("table",{staticClass:"bordered responsive-table"},[e("thead",[e("th",[t._v("指令")]),t._v(" "),e("th",[t._v("说明")])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("v-modal:modalA")]),t._v(" "),e("td",[t._v("\n          指令的参数 arg (即 modalA) 对应 r-modal 组件的属性 id (modalA)\n        ")])])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("table",{staticClass:"bordered responsive-table"},[e("thead",[e("th",[t._v("属性")]),t._v(" "),e("th",[t._v("说明")]),t._v(" "),e("th",[t._v("类型")]),t._v(" "),e("th",[t._v("默认值")])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("id")]),t._v(" "),e("td",[t._v("modal 的 id 属性对应 v-modal 指令的 arg")]),t._v(" "),e("td",[t._v("String")]),t._v(" "),e("td",[t._v("-")])]),t._v(" "),e("tr",[e("td",[t._v("top")]),t._v(" "),e("td",[t._v("modal 从顶部显示")]),t._v(" "),e("td",[t._v("Boolean")]),t._v(" "),e("td",[t._v("false")])]),t._v(" "),e("tr",[e("td",[t._v("bottom")]),t._v(" "),e("td",[t._v("modal 从底部显示")]),t._v(" "),e("td",[t._v("Boolean")]),t._v(" "),e("td",[t._v("false")])]),t._v(" "),e("tr",[e("td",[t._v("-")]),t._v(" "),e("td",[t._v("modal 从中间显示 (top 和 bottom 都为false)")]),t._v(" "),e("td",[t._v("Boolean")]),t._v(" "),e("td",[t._v("true")])])])])}]}}});