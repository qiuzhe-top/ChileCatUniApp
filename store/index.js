import Vue from 'vue'
import Vuex from 'vuex'
import {
	api
} from '@/common/http.api.js'
Vue.use(Vuex)

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = [];
// let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}

let vuex_user_defut = {
	username: '',
	college: '',
	grade: '',
	avatar: 'https://s.pc.qq.com/tousu/img/20210823/4865226_1629724433.jpg',
	experience: {
		a: 0,
		b: 1
	}
}

const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : vuex_user_defut,
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: 'V2.0.1',
		vuex_index_loading: false,
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		},
		INIT_INDEX_LOADING: (state, data) => {
			if (state.vuex_user.username) {
				state.vuex_index_loading = false
			}
		},
		
	},
	actions: {
		save:({commit,dispatch},dict) => {
			commit('$uStore',{name:dict[0],value:dict[1]})
		},
		// 获取个人信息
		information({
			commit,
			dispatch
		}, request) {
			dispatch('save', ['vuex_index_loading',true]);
			return new Promise((resolve, reject) => {
				api.user_information(request)
					.then(response => {
						dispatch('save', ['vuex_user',response.data])
						const token = uni.getStorageSync('token');
						dispatch('save', ['vuex_token',token])
						resolve(response)
					})
					.catch(error => {
						dispatch('save', ['vuex_index_loading',false]);
						dispatch('logout')
						reject(error)
					})
			})
		},
		// 退出登录
		logout({
			commit,dispatch
		}, request) {
			uni.setStorageSync('token', '');
			dispatch('save', ['vuex_token',undefined]);
			dispatch('save', ['vuex_user',vuex_user_defut]);
		},
		// 我的寝室信息
		mybedroom({
			commit,dispatch
		}, request) {
			return new Promise((resolve, reject) => {
				api.school_information_mybedroom(request)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
	}
})

const listToDict = function(list){
	return {name:list[0],value:list[1]}
}
export default store
