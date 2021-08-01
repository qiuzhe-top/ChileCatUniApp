import store from '../../store'
import api from '@/common/vmeitime-http/index.js'
const getDefaultState = () => {
	return {
		// 请假类型
		leave_type: '',
		// 当前请假条
		ask_now: '',
		// 请假条列表(自己)
		ask_all: [
			[],[]
		],
		// 班委获取班级请假条标识
		monitor: ''
	}
}

const state = getDefaultState()

const mutations = {
	SET_LEAVE_TYPE: (state, list) => {
		state.leave_type = list
	},
	SET_CURRENT_ASK: (state, obj) => {
		state.current_ask = obj
	},
	SET_ASK_ALL: (state, obj) => {
		state.ask_all[obj.type] = obj.list
	},
	SET_MONITOR: (state, data) => {
		state.monitor = data
	},
	SET_ASK_NOW: (state, obj) => {
		state.ask_now = obj
	}
}

const actions = {
	// 获取类型
	leave_type({
		commit
	},data='') {
		return new Promise((resolve, reject) => {
			console.log('// 获取类型')
			api.ask.leave_type().then(res => {
				console.log('// 获取类型')
				this.commit('ask/SET_LEAVE_TYPE', res.data.data)
				resolve(res)
			}).catch(err => {
				
				reject(err)
			})
		
		})
	},
	// 获取请假条
	draft_get({
		commit,
		state
	}, data) {
		return new Promise((resolve, reject) => {
			data['monitor'] = state.monitor
			api.ask.draft(data).then(res => {
				var obj = {
					list: res.data.data.list,
					type: data.type
				}
				this.commit('ask/SET_ASK_ALL', obj)
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 撤销请假条
	draft_delete({
		commit
	}, data) {
		return new Promise((resolve, reject) => {
			api.ask.draft(data, 'DELETE').then(res => {
				console.log(res.data)
				resolve(res.data)
			}).catch(err => {

			})
		})
	},
	// 续假
	draft_put({
		commit
	}, data) {
		return new Promise((resolve, reject) => {
			api.ask.draft(data, 'PUT').then(res => {
				console.log(res.data)
				resolve(res.data)
			}).catch(err => {
				console.log('续假错误')
				reject(err)
			})
		})
	},
	// 提交请假条
	draft_post({
		commit
	}, data) {
		return new Promise((resolve, reject) => {
			api.ask.draft(data, "POST").then(res => {
				console.log(res.data)
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	// 点击请假条查看详情

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
