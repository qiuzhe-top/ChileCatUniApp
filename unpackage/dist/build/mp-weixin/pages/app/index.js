(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/app/index"],{3891:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:[{image:"https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313204642.png",title:"昨夜星辰昨夜风，画楼西畔桂堂东"},{image:"https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313204852.png",title:"身无彩凤双飞翼，心有灵犀一点通"},{image:"https://gitee.com/OtherNetwork/imgBox/raw/master/picimg/20210313204927.png",title:"谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳"}],title:!1,mode:"round",indicatorPos:"bottomCenter",effect3d:!1}},onLoad:function(){},methods:{msg:function(){t.showToast({title:"功能开发中",icon:"none"})},go_to:function(e,n){var i={ask:"/pages/ask/index",floor:"/pages/life/floor",bulletin:"/pages/life/bulletin",activity:"/pages/app/activity/index",mood:"/pages/app/mood/index"};"floor"==e&&this.$store.commit("life/SET_WORK_TYPE",n),t.navigateTo({url:i[e]})},titleChange:function(t){this.title=0==t},modeChange:function(t){this.mode=0==t?"round":1==t?"rect":2==t?"number":"none"},indicatorPosChange:function(t){this.indicatorPos=0==t?"topLeft":1==t?"topRight":2==t?"bottomLeft":3==t?"bottomCenter":"bottomRight"},effect3dChange:function(t){this.effect3d=0==t},click:function(t){this.$refs.uToast.show({title:"点击了第".concat(t+1,"张图片"),type:"success"})},change:function(t){}}};e.default=n}).call(this,n("543d")["default"])},9966:function(t,e,n){"use strict";n.r(e);var i=n("b3d7"),o=n("d198");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("9a5c");var c,r=n("f0c5"),a=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=a.exports},"9a5c":function(t,e,n){"use strict";var i=n("eeeb"),o=n.n(i);o.a},b3d7:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"eaa3"))},uSwiper:function(){return n.e("uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"018a"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"327e"))},uGrid:function(){return n.e("uview-ui/components/u-grid/u-grid").then(n.bind(null,"cc45"))},uGridItem:function(){return n.e("uview-ui/components/u-grid-item/u-grid-item").then(n.bind(null,"16e0"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[]},d198:function(t,e,n){"use strict";n.r(e);var i=n("3891"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},e5be:function(t,e,n){"use strict";(function(t){n("137f");i(n("66fd"));var e=i(n("9966"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},eeeb:function(t,e,n){}},[["e5be","common/runtime","common/vendor"]]]);