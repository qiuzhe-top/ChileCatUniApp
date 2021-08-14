(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/school_attendance/component/people_list"],{"08a3":function(t,e,n){"use strict";n.r(e);var a=n("da82"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"46f7":function(t,e,n){},aeb6:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},b303:function(t,e,n){"use strict";var a=n("46f7"),o=n.n(a);o.a},da82:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{is_position_mode:{type:Boolean,default:!1},init_people_store:String,request_data:Object},data:function(){return{people_list:[]}},mounted:function(){this.initBed()},methods:{initBed:function(){var t=this;this.$store.dispatch(this.$props.init_people_store,this.$props.request_data).then((function(e){var n=e.data,a=n.length;a<6&&(a=6);for(var o=0;o<a;o++){var i=o+1,r={name:" 空 位 ",bed_position:i};n.forEach((function(t){t.bed_position===i&&(r["user_id"]=t.id,r["name"]=t.name,r["status"]=t.status,r["reason_is_custom"]=!1)})),t.people_list.push(r)}}))}}};e.default=a},e28e:function(t,e,n){"use strict";n.r(e);var a=n("aeb6"),o=n("08a3");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("b303");var r,u=n("f0c5"),s=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/school_attendance/component/people_list-create-component',
    {
        'pages/school_attendance/component/people_list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e28e"))
        })
    },
    [['pages/school_attendance/component/people_list-create-component']]
]);
