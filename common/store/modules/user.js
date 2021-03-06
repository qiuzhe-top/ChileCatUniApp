import store from '@/common/store'
import api from '@/common/vmeitime-http/index.js'
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
	RESET_INFORMATION: (state,data) =>{
		state.information = data
	},
	SET_TOKEN:(state,data) => {
		state.token = data
	}
}

const actions = {
	// 刷新验证码
	getIdcode({
		commit
	}, request) {
		console.log('刷新验证码')
		return new Promise((resolve, reject) => {
			resolve("上诉讼")
		})
	},
	// 登录
	login({
		commit
	}, request) {
		return new Promise((resolve, reject) => {
			api.user.login(request).then(res => {
				if (res.data.code == 2000) {
					try {
						uni.setStorageSync('token', res.data.data.token); //存入缓存
					} catch (e) {
						// error
					}
					// store.commit
					// store.commit('user/SET_TOKEN',res.data.data.token)
					// uni.showToast({
					// 	icon: 'success',
					// 	position: 'bottom',
					// 	title: '登录成功'
					// });
					
					this.dispatch('user/getInformation')
				
					if(getCurrentPages().length==1){
						console.log('redirectTo')
						uni.switchTab ({
							url:'/pages/app/index'
						})
					}else{
						uni.navigateBack({
							delta: 1
						});
					}
					
				} else {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '账号或密码错误'
					});
				}
				resolve(res)
			}).catch(error => {
				// commit('SET_IDCODE', '获取失败')
				reject(error)
			})
		})
	},
	// 退出登录
	logout(){
		uni.setStorageSync('idcode', '');
		uni.setStorageSync('token', '');
		this.commit('user/RESET_STATE')
		// uni.reLaunch({
		// 	url: '/pages/auth/login'
		// });
	},
	// 获取用户信息
	getInformation({commit},request){
		return new Promise((resolve,reject)=>{
			api.user.getInformation(request).then((res)=>{
				this.commit('user/RESET_INFORMATION',res.data.data)
			}).catch((error)=>{
				
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
