(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/attendance/component/people_list"],{"0edd":function(t,n,e){"use strict";e.r(n);var i=e("6f3f"),o=e("bffa");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("5c83");var r,u=e("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);n["default"]=s.exports},"470b":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={props:{is_position_mode:{type:Boolean,default:!1},init_people_store:String,request_data:Object},data:function(){return{people_list:[]}},mounted:function(){this.initBed()},methods:{initBed:function(){var t=this;this.$store.dispatch(this.$props.init_people_store,this.$props.request_data).then((function(n){var e=n.data,i=e.length;i<6&&(i=6);for(var o=0;o<i;o++){var a=o+1,r={name:" 空 位 ",bed_position:a};e.forEach((function(t){t.bed_position===a&&(r["user_id"]=t.id,r["name"]=t.name,r["status"]=t.status,r["reason_is_custom"]=!1)})),t.people_list.push(r)}}))}}};n.default=i},"5c83":function(t,n,e){"use strict";var i=e("90f3"),o=e.n(i);o.a},"6f3f":function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var o=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"90f3":function(t,n,e){},bffa:function(t,n,e){"use strict";e.r(n);var i=e("470b"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/attendance/component/people_list-create-component',
    {
        'pages/attendance/component/people_list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0edd"))
        })
    },
    [['pages/attendance/component/people_list-create-component']]
]);
