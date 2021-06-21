import store from '../../store'
import api from '@/common/vmeitime-http/index.js'
const getDefaultState = () => {
	return {

		// 当前工作类型 absence：晚查寝 health：寝室卫生检查
		work_type: '',
		// 当前任务ID
		task_now: {},
		
		// --- 寝室 ---
		// 当前楼
		floor_now:{},
		// 当前层
		layer_now:{},
		// 当前房间
		room_now:{},
		
		
		// --- 晚自修 ---
		// 班级
		class_list:[{
			id:0,
			name:'刷新页面'
		}],
		// 点名规则
		roll_call_list:[],
		// 违纪规则
		vd_rull_list:[]
		
	}
}

const state = getDefaultState()

const mutations = {
	SET_CLASS_LIST: (state, data) => {
		state.class_list = data
	},
	SET_ROLL_CALL_LIST: (state, data) => {
		state.roll_call_list = data
	},
	SET_VD_RULL_LIST: (state, data) => {
		state.vd_rull_list = data
	},
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
	},
	SET_TASK_NOW: (state, obj) => {
		state.task_now = obj
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
