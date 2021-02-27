import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import api from '@/common/vmeitime-http/'
// import iconfont from '@/common/css/font_2269800_s3tsuqnxe7/iconfont.js'


Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'


import uView from 'uview-ui';
Vue.use(uView);

const app = new Vue({
	...App,
	store,
})
app.$mount()
