import store from '../../store'
import api from '@/common/vmeitime-http/index.js'
const getDefaultState = () => {
	return {
		// 晚查寝验证码
		knowing_code: '',
		// 寝室卫生验证码
		hygienist_code: '',
		// 当前工作类型 absence：晚查寝 health：寝室卫生检查
		work_type: '',
		// 当前楼
		floor_now:{},
		// 当前层
		layer_now:{},
		// 当前房间
		room_now:{},
		
	}
}

const state = getDefaultState()

const mutations = {
	SET_KNOWING_CODE: (state, code) => {
		state.knowing_code = code
	},
	SET_HYGIENIST_CODE: (state, code) => {
		state.hygienist_code = code
	},
	SET_WORK_TYPE: (state, type) => {
		state.work_type = type
	},
	SET_ROOM_NOW: (state, obj) => {
		state.room_now = obj
	},
	SET_LAYER_NOW: (state, obj) => {
		state.layer_now = obj
	},
	SET_FLOOR_NOW: (state, obj) => {
		state.floor_now = obj
	}
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
