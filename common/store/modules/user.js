import store from '@/common/store'
import api from '@/common/vmeitime-http/index.js'
// import api from '@/common/vmeitime-http/model/user.js'

const getDefaultState = () => {
	return {
		name: '',
		avatar: '',
		information: '',
		classList: '',
		token: ''
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	RESET_INFORMATION: (state, data) => {
		state.information = data
	},
	SET_TOKEN: (state, data) => {
		state.token = data
	}
}

const actions = {
	// TpiStart
	// 登录
	login({
		commit
	}, request) {
		const {
			username,
			password
		} = request
		console.log(request)
		api.user.login(request)
		return new Promise((resolve, reject) => {
			api.login(request).then(response => {
					const {
						token
					} = response.data
					console.log(response)
					// if (res.data.code == 2000) {
					// 	try {
					// 		uni.setStorageSync('token', res.data.data.token); //存入缓存
					// 	} catch (e) {
					// 		// error
					// 	}
					// 	// store.commit
					// 	// store.commit('user/SET_TOKEN',res.data.data.token)
					// 	// uni.showToast({
					// 	// 	icon: 'success',
					// 	// 	position: 'bottom',
					// 	// 	title: '登录成功'
					// 	// });

					// 	this.dispatch('user/getInformation')

					// 	if(getCurrentPages().length==1){
					// 		console.log('redirectTo')
					// 		uni.switchTab ({
					// 			url:'/pages/app/index'
					// 		})
					// 	}else{
					// 		uni.navigateBack({
					// 			delta: 1
					// 		});
					// 	}

					// } else {
					// 	uni.showToast({
					// 		icon: 'none',
					// 		position: 'bottom',
					// 		title: '账号或密码错误'
					// 	});
					// }
					// commit('SET_TOKEN', token)
					// setToken(token)
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 退出登录
	logout({
		commit
	}, request) {
		uni.setStorageSync('idcode', '');
		uni.setStorageSync('token', '');
		this.commit('user/RESET_STATE')
		// uni.reLaunch({
		// 	url: '/pages/auth/login'
		// });
	},
	// 注册
	register({
		commit
	}, request) {
		const {
			username,
			password,
			password_repaet
		} = request

		return new Promise((resolve, reject) => {
			api
				.register(request)
				.then(response => {
					const {
						token
					} = response.data

					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 修改个人信息
	edit({
		commit
	}, request) {
		return new Promise((resolve, reject) => {
			api
				.edit(request)
				.then(response => {
					this.commit('user/RESET_INFORMATION', response.data.data)
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 修改密码
	edit_password({
		commit
	}, request) {
		const {
			password_old,
			password_new,
			password_new_repaet
		} = request

		return new Promise((resolve, reject) => {
			api
				.edit_password(request)
				.then(response => {
					const {
						token
					} = response.data

					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 获取个人信息
	information({
		commit
	}, request) {
		return new Promise((resolve, reject) => {
			api
				.information(request)
				.then(response => {
					const {
						is_superuser,
						is_staff,
						permissions,
						roles,
						grade,
						avatar,
						username
					} = response.data
					if (!response.data) {
						return reject('Verification failed, please Login again.')
					}
					commit('SET_NAME', username)
					commit('SET_AVATAR', avatar)
					commit('SET_ROLE', roles)
					commit('SET_IS_ADMIN', is_staff)
					commit('SET_IS_SUPERUSER', is_superuser)
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 绑定班级
	bind_grade({
		commit
	}, request) {
		return new Promise((resolve, reject) => {
			api
				.bind_grade(request)
				.then(response => {
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// 绑定微信
	bindwechat({
		commit
	}, request) {
		return new Promise((resolve, reject) => {
			api
				.bindwechat(request)
				.then(response => {
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			removeToken() // must remove  token  first
			commit('RESET_STATE')
			resolve()
		})
	},
	// 获取用户对应班级
	getClass({
		commit
	}) {
		return new Promise((resolve, reject) => {
			api
				.getClass()
				.then(res => {
					const {
						data
					} = res
					console.log(data)
					commit('SET_CLASSLIST', data)
					resolve()
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
