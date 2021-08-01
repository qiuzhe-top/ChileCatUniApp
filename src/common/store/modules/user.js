import store from '@/common/store'
// import api from '@/common/vmeitime-http/index.js'
import api from '@/common/vmeitime-http/model/user.js'

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
		// api.login(request)
		return new Promise((resolve, reject) => {
			api.login(request).then(response => {
					const {
						token
					} = response.data
					// 缓存token
					try {
						uni.setStorageSync('token', token);
					} catch (e) {
						// error
					}
					commit('SET_TOKEN', token)

					// 获取个人信息
					this.dispatch('user/information')
					// 跳转页面
					if (getCurrentPages().length == 1) {
						console.log('redirectTo')
						uni.switchTab({
							url: '/pages/app/index'
						})
					} else {
						uni.navigateBack({
							delta: 1
						});
					}

					resolve(response)
				})
				.catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '登录失败'
					});
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
		uni.reLaunch({
			url: '/pages/auth/login'
		});
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
			api.edit_password(request)
				.then(response => {
					this.dispatch('user/logout')
					this.$refs.uToast.show({
						title: '修改成功',
						type: 'success',
					})
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
					this.commit('user/RESET_INFORMATION', response.data)
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
