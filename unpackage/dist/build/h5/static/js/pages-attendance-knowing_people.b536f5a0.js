(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-attendance-knowing_people"],{"18f6":function(t,n,e){"use strict";(function(t){var o=e("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(e("98fd")),s={components:{People:a.default},data:function(){return{form_list:[]}},onLoad:function(t){},mounted:function(){},methods:{record:function(){var n=this.$refs.people.user_obj,e=this.$refs.people.form;t("log",n," at pages/attendance/knowing_people.vue:35"),void 0!=n.reason&&0!=n.reason.length?(n.status="0",e.push({name:n.name,user_id:n.user_id,status:n.status,reason_is_custom:n.reason_is_custom,reason:n.reason}),uni.showToast({title:"添加成功",icon:"none"})):uni.showToast({title:"添加失败，原因为空",icon:"none"}),this.$data.form_list=e},submint:function(){var t=this.$refs.people.form;uni.showLoading({title:"加载中"}),this.$u.api.school_attendance_submit_knowing({task_id:this.vuex_task.id,records:t,room_id:this.vuex_room_now.id}).then((function(t){uni.showToast({title:"提交成功",duration:6e3}),setTimeout((function(){uni.navigateBack({delta:.8})}),1e3)}))}}};n.default=s}).call(this,e("0de9")["log"])},3333:function(t,n,e){"use strict";e.r(n);var o=e("8dd1"),a=e("ffc0");for(var s in a)"default"!==s&&function(t){e.d(n,t,(function(){return a[t]}))}(s);e("8570");var i,u=e("f0c5"),r=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"0864689a",null,!1,o["a"],i);n["default"]=r.exports},4690:function(t,n,e){var o=e("24fb");n=o(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.people .button-sp-area[data-v-0864689a]{margin-top:%?80?%}.sub-button[data-v-0864689a]{width:60%;color:#fff;background-color:#04b8fc}.msg[data-v-0864689a]{display:inline-block;width:100%;margin:%?20?%;color:silver;text-align:center}',""]),t.exports=n},"55be":function(t,n,e){var o=e("4690");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=e("4f06").default;a("1da7ad32",o,!0,{sourceMap:!1,shadowMode:!1})},8570:function(t,n,e){"use strict";var o=e("55be"),a=e.n(o);a.a},"8dd1":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return o}));var o={uTag:e("b6a1").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"people"},[e("People",{ref:"people",attrs:{rule_codename_store:"0#001",init_people_store:"dorm_student_room_info"},on:{record:function(n){arguments[0]=n=t.$handleEvent(n),t.record.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"button-sp-area"},[e("v-uni-button",{staticClass:"sub-button",attrs:{type:"mini"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.submint.apply(void 0,arguments)}}},[t._v("提交")])],1),e("v-uni-text",{staticClass:"msg"},[t._v("白色背景：学生不在寝室")]),e("v-uni-view",{staticClass:"simpie_tag u-flex u-row-center u-col-center u-flex-wrap "},t._l(t.form_list,(function(t,n){return e("u-tag",{key:t.id,attrs:{text:t.name+t.reason,type:"info",show:!0}})})),1)],1)},s=[]},ffc0:function(t,n,e){"use strict";e.r(n);var o=e("18f6"),a=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);n["default"]=a.a}}]);