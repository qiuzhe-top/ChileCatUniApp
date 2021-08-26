(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/attendance/component/people_list"],{"0edd":function(t,e,n){"use strict";n.r(e);var i=n("8e53"),o=n("bffa");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("5c83");var r,u=n("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=s.exports},"470b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{is_position_mode:{type:Boolean,default:!1},init_people_store:String,request_data:Object},data:function(){return{people_list:[]}},mounted:function(){this.initBed()},methods:{initBed:function(){var t=this;this.$store.dispatch(this.$props.init_people_store,this.$props.request_data).then((function(e){var n=e.data,i=n.length;i<6&&(i=6);for(var o=0;o<i;o++){var a=o+1,r={name:" 空 位 ",bed_position:a};n.forEach((function(t){t.bed_position===a&&(r["user_id"]=t.id,r["name"]=t.name,r["status"]=t.status,r["reason_is_custom"]=!1)})),t.people_list.push(r)}}))}}};e.default=i},"5c83":function(t,e,n){"use strict";var i=n("90f3"),o=n.n(i);o.a},"8e53":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"90f3":function(t,e,n){},bffa:function(t,e,n){"use strict";n.r(e);var i=n("470b"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/attendance/component/people_list-create-component',
    {
        'pages/attendance/component/people_list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0edd"))
        })
    },
    [['pages/attendance/component/people_list-create-component']]
]);
