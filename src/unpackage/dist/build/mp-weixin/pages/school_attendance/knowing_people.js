(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/school_attendance/knowing_people"],{"26a9":function(t,n,e){"use strict";e.r(n);var o=e("9b4d"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},"3e5a":function(t,n,e){"use strict";(function(t){e("3fa2");o(e("66fd"));var n=o(e("af7f"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},6114:function(t,n,e){},"9b4d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){e.e("components/ming-pop/ming-pop").then(function(){return resolve(e("0c2a"))}.bind(null,e)).catch(e.oe)},a=function(){e.e("pages/school_attendance/component/people").then(function(){return resolve(e("a5b0"))}.bind(null,e)).catch(e.oe)},i={components:{pop:o,People:a},data:function(){return{form_list:[]}},onLoad:function(t){},mounted:function(){},methods:{record:function(){var n=this.$refs.people.user_obj,e=this.$refs.people.form;void 0!=n.reason?(n.status="0",e.push(n),t.showToast({title:"添加成功",icon:"none"})):t.showToast({title:"添加失败，原因为空",icon:"none"}),this.$data.form_list=e},submint:function(){var n=this.$refs.people.form;t.showLoading({title:"加载中"}),this.$store.dispatch("school_attendance/submit_knowing",{task_id:this.$store.getters.task_now.id,records:n,room_id:this.$store.getters.room_now.id}).then((function(n){t.showToast({title:"提交成功",duration:6e3}),setTimeout((function(){t.navigateBack({delta:.8})}),1e3)}))}}};n.default=i}).call(this,e("543d")["default"])},"9fd3":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},i=[]},af7f:function(t,n,e){"use strict";e.r(n);var o=e("9fd3"),a=e("26a9");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("ec51");var u,c=e("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=r.exports},ec51:function(t,n,e){"use strict";var o=e("6114"),a=e.n(o);a.a}},[["3e5a","common/runtime","common/vendor"]]]);