import Vue from 'vue'
import Vuex from 'vuex'
import uploader from "@/common/uploader/uploader.js";
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
let saveStateKeys = [
	'vuex_tasks',
	'vuex_task', 
	'vuex_floor_now', 
	'vuex_layer_now', 
	'vuex_room_now', 
	'vuex_call_rules',
	'vuex_discipline_rules', 
	'vuex_call',
	'vuex_rule_00001',
	'vuex_rule_00007',
	'vuex_room_user_info'
];

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
let vuex_call_defut = {
	'0':{
		'3#2': {
			'01': {
				'Knowing_Status': 0,
				'Health_Status': 0,
				'20653B125': 0,
				'20653B128': 1
			}
		}
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: 'V2.0.1',
		vuex_index_loading: false,
		vuex_ali_icon: 'https://zhcy-zjjt.oss-cn-beijing.aliyuncs.com/icon/',
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : vuex_user_defut,
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_tasks: lifeData.vuex_tasks ? lifeData.vuex_tasks : [],
		vuex_task: lifeData.vuex_task ? lifeData.vuex_task : {},
		// 当前楼
		vuex_floor_now: lifeData.vuex_floor_now ? lifeData.vuex_floor_now : {},
		// 当前层
		vuex_layer_now: lifeData.vuex_layer_now ? lifeData.vuex_layer_now : {},
		// 当前房间
		vuex_room_now: lifeData.vuex_room_now ? lifeData.vuex_room_now : {},
		// 房间学生信息
		vuex_room_user_info: lifeData.vuex_room_user_info ? lifeData.vuex_room_user_info : {},
		// 点名规则列表
		vuex_call_rules: lifeData.vuex_call_rules ? lifeData.vuex_call_rules : [],
		// 晚查寝点名规则
		vuex_rule_00001: lifeData.vuex_rule_00001 ? lifeData.vuex_rule_00001 : [],
		// 检查卫生规则
		vuex_rule_00007: lifeData.vuex_rule_00007 ? lifeData.vuex_rule_00007 : [],
		// 考勤任务各数据状态
		vuex_call: lifeData.vuex_call ? lifeData.vuex_call : vuex_call_defut,
		// 违纪检查规则列表
		vuex_discipline_rules: lifeData.vuex_discipline_rules ? lifeData.vuex_discipline_rules : [],
		// 点名时加载的班级列表
		vuex_class_list: [{
			id: -1,
			name: ''
		}]
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
		// INIT_INDEX_LOADING: (state, data) => {
		// 	if (state.vuex_user.username) {
		// 		state.vuex_index_loading = false
		// 	}
		// },

	},
	actions: {

		//保存Vuex变量
		save: ({
			commit,
			dispatch
		}, dict) => {
			commit('$uStore', {
				name: dict[0],
				value: dict[1]
			})
		},

		// 初始化App
		init_app: ({
			commit,
			dispatch
		}, data) => {
			return new Promise((resolve, reject) => {
				dispatch('information').then(res => {
						// if (!data) dispatch('save', ['vuex_index_loading', false])
						resolve(res)
					})
					.catch(error => {
						reject(error)
			
				})
			})
		},

		// 获取个人信息
		information({
			commit,
			dispatch
		}, request) {
			// dispatch('save', ['vuex_index_loading', true]);
			return new Promise((resolve, reject) => {
				api.user_information(request)
					.then(response => {
						const token = uni.getStorageSync('token');
						dispatch('save', ['vuex_user', response.data])
						dispatch('save', ['vuex_token', token])
						resolve(response)
					})
					.catch(error => {
						// dispatch('save', ['vuex_index_loading', false]);
						reject(error)
					})
			})
		},

		// 退出登录
		logout({
			commit,
			dispatch
		}, request) {
			uni.setStorageSync('token', '');
			dispatch('save', ['vuex_token', undefined]);
			dispatch('save', ['vuex_user', vuex_user_defut]);
			dispatch('save', ['vuex_tasks', []]);
			dispatch('save', ['vuex_task', {}]);
			dispatch('save', ['vuex_call', {}]);
		},

		// 我的寝室信息
		mybedroom({
			commit,
			dispatch
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
		// 加载我的活动
		init_my_task({
			commit,
			dispatch
		}, request) {
			var d = {
				'0': 'floor.png',
				'1': 'health.png',
				'2': 'book.png'
			}
			var msg1 = {
				'0': '去寝室进行点名 看看有没有缺寝的同学',
				'1': '检查寝室卫生 维持寝室干净',
				'2': '检查学生自习情况'
			}
			var msg2 = {
				'0': '去寝室进行点名 看看有没有缺寝的同学',
				'1': 'health.png',
				'2': 'book.png'
			}
			var type_status = {
				'1': 'Health_Status',
				'0': 'Knowing_Status'
			}
			if(!uni.getStorageSync('token')){return}
			console.log('加载任务')
			return new Promise((resolve, reject) => {
				api.school_attendance_task_executor().then(res => {
					var vuex_call = {}
					res.data.forEach(i => {
						i.img = store.state.vuex_ali_icon + d[i.type]
						i.msg1 = msg1[i.type]
						i.type_name = type_status[i.type]
						i.msg2 = i.title
						if (i.type == '0' || i.type == '1') {
							// 整理楼层数据
							var rooms = {}
							var buildings = i.buildings
							var room_call = {}
							buildings.forEach(room => {
								var b = room.split('#')[0]
								var f = room.split('#')[1].substr(0, 1)
								if (!rooms.hasOwnProperty(b)) {
									rooms[b] = {}
								}
								if (!rooms[b].hasOwnProperty(f)) {
									rooms[b][f] = []
								}
								if (!room_call.hasOwnProperty(b + '#' + f)) {
									room_call[b + '#' + f] = {}
								}
								rooms[b][f].push(room)
								room_call[b + '#' + f][room.slice(-2)] = {
									'status': 0
								}
							})
							vuex_call[i.type] = room_call

						}

						if (i.type === '0') {
							// 加载规则
							dispatch('school_attendance_rule', {
								codename: '00001'
							}).then(res => {
								dispatch('save', ['vuex_rule_00001', res.data]);
							})
						} else if (i.type === '1') {
							// 加载规则
							dispatch('school_attendance_rule', {
								codename: '00007'
							}).then(res => {
								dispatch('save', ['vuex_rule_00007', res.data]);
							})
						} else if (i.type === '2') {

						}
						i.rooms = rooms
					})
					// console.log(res.data)
					// 保存楼层状态
					dispatch('save', ['vuex_call', vuex_call])
					// 保存任务数据
					dispatch('save', ['vuex_tasks', res.data]);
				})
			})
		},

		// 获取规则
		school_attendance_rule({
			commit,
			dispatch
		}, request) {
			return new Promise((resolve, reject) => {
				api.school_attendance_rule(request).then(res => {
						resolve(res)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		// 宿舍学生信息(查寝 查卫生)
		dorm_student_room_info({
			commit,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				var s = store.state
				let req = {
					task_id: s.vuex_task.id,
					room_id: s.vuex_room_now
				}
				// console.log(req)
				api.school_attendance_dorm_student_room_info(req).then(res => {
						resolve(res)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		// 上传文件
		upload({
			commit,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					success: async (tempRes) => {
						// // console.log(tempRes.tempFiles);
						let file = tempRes.tempFiles[0]
						// 上传多张在这里写个for循环即可 因为是 await 所以会同步执行 一个个传完
						let res = await uploader.upload_qiniu(file);
					}
				})
			})
		},


	}
})

const listToDict = function(list) {
	return {
		name: list[0],
		value: list[1]
	}
}
export default store
