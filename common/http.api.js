// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
let api = {}
const install = (Vue, vm) => {
	// 登录 	
	api['user_login'] = (params) => vm.$u.post('/api/user/login', params) 
	// 退出登录 
	api['user_logout'] = (params = { }) => vm.$u.post('/api/user/logout', params) 
	// 注册 
	api['user_register'] = (params = { }) => vm.$u.post('/api/user/register', params) 
	// 修改个人信息 
	api['user_edit'] = (params = { }) => vm.$u.post('/api/user/edit', params) 
	// 修改密码 
	api['user_edit_password'] = (params = { }) => vm.$u.post('/api/user/edit/password', params) 
	// 获取个人信息  
	api['user_information'] = (params = { }) => vm.$u.post('/api/user/information', params) 
	// 绑定班级 
	api['user_bind_grade'] = (params = { }) => vm.$u.post('/api/user/bind/grade', params) 
	// 考勤 获取用户基本信息 
	api['school_information_student_information'] = (params = { }) => vm.$u.post('/api/school_information/student/information', params) 
	// 修改床位 
	api['school_information_update_beds'] = (params = { }) => vm.$u.post('/api/school_information/update/beds', params) 
	// 我的寝室信息 
	api['school_information_mybedroom'] = (params = { }) => vm.$u.post('/api/school_information/mybedroom', params) 
	// 获取分院 
	api['school_information_college_query'] = (params = { }) => vm.$u.post('/api/school_information/college/query', params) 
	// 获取任务 
	api['school_attendance_task_obtain'] = (params = { }) => vm.$u.post('/api/school_attendance/task/obtain', params) 
	// 开启/关闭任务 
	api['school_attendance_task_switch'] = (params = { }) => vm.$u.post('/api/school_attendance/task/switch', params) 
	// 重置查寝任务状态 
	api['school_attendance_task_rest_knowing'] = (params = { }) => vm.$u.post('/api/school_attendance/task/rest/knowing', params) 
	// 重置晚自修任务状态 
	api['school_attendance_task_rest_late'] = (params = { }) => vm.$u.post('/api/school_attendance/task/rest/late', params) 
	// 重置卫生检查任务状态 
	api['school_attendance_task_rest_health'] = (params = { }) => vm.$u.post('/api/school_attendance/task/rest/health', params) 
	// 获取排版表 
	api['school_attendance_scheduling'] = (params = { }) => vm.$u.post('/api/school_attendance/scheduling', params) 
	// 修改查寝班表 
	api['school_attendance_scheduling_update_knowing'] = (params = { }) => vm.$u.post('/api/school_attendance/scheduling/update/knowing', params) 
	// 修改晚自修班表 
	api['school_attendance_scheduling_update_late'] = (params = { }) => vm.$u.post('/api/school_attendance/scheduling/update/late', params) 
	// 考勤学生记录情况 
	api['school_attendance_condition'] = (params = { }) => vm.$u.post('/api/school_attendance/condition', params) 
	// 销假(当前任务管理员) 
	api['school_attendance_undo_record'] = (params = { }) => vm.$u.post('/api/school_attendance/undo/record', params) 
	// 销假(分院管理员) 
	api['school_attendance_undo_record_admin'] = (params = { }) => vm.$u.post('/api/school_attendance/undo/record/admin', params) 
	// 工作者获取任务 
	api['school_attendance_task_executor'] = (params = { }) => vm.$u.post('/api/school_attendance/task/executor', params) 
	// 当天考勤数据导出 
	api['school_attendance_knowing_excel_out'] = (params = { }) => vm.$u.post('/api/school_attendance/knowing/excel/out', params) 
	// 获取规则 
	api['school_attendance_rule'] = (params = { }) => vm.$u.post('/api/school_attendance/rule', params) 
	// 晚自修考勤 违纪提交 
	api['school_attendance_submit_late_discipline'] = (params = { }) => vm.$u.post('/api/school_attendance/submit/late/discipline', params) 
	// 晚自修考勤 点名提交 
	api['school_attendance_submit_late'] = (params = { }) => vm.$u.post('/api/school_attendance/submit/late', params) 
	// 寝室考勤 点名提交 
	api['school_attendance_submit_knowing'] = (params = { }) => vm.$u.post('/api/school_attendance/submit/knowing', params) 
	// 寝室卫生 检查提交 
	api['school_attendance_submit_health'] = (params = { }) => vm.$u.post('/api/school_attendance/submit/health', params) 
	// 楼内层列表 
	api['school_attendance_dorm_storey_info'] = (params = { }) => vm.$u.post('/api/school_attendance/dorm/storey/info', params) 
	// 层内房间列表 
	api['school_attendance_dorm_room_info'] = (params = { }) => vm.$u.post('/api/school_attendance/dorm/room/info', params) 
	// 房间学生 信息 
	api['school_attendance_dorm_student_room_info'] = (params = { }) => vm.$u.post('/api/school_attendance/dorm/student/room/info', params) 
	// 学生查看公告 
	api['school_attendance_student_disciplinary'] = (params = { }) => vm.$u.post('/api/school_attendance/student/disciplinary', params) 
	// 晚自修数据 
	api['school_attendance_late_class'] = (params = { }) => vm.$u.post('/api/school_attendance/late/class', params) 
	// 考勤查询 
	api['school_attendance_record_query'] = (params = { }) => vm.$u.post('/api/school_attendance/record/query', params) 
	// 个人违纪查询 
	api['school_attendance_personal_discipline_query'] = (params = { }) => vm.$u.post('/api/school_attendance/personal/discipline/query', params) 
	// 导入早签数据 

	api['school_attendance_inzaoqian_excel'] = (params = { }) => vm.$u.post('/api/school_attendance/inzaoqian/excel', params) 
	// 筛选导出记录情况 
	api['school_attendance_out_data'] = (params = { }) => vm.$u.post('/api/school_attendance/out/data', params) 
	// 系统数据初始化 
	api['manage_data_init'] = (params = { }) => vm.$u.post('/api/manage/data/init', params) 
	// api接口 
	api['manage_getapis'] = (params = { }) => vm.$u.get('/api/manage/getapis', params) 
	// api转uViewsApi模板 
	api['manage_apitouviews'] = (params = { }) => vm.$u.post('/api/manage/apitouviews', params) 

	// 设置我的寝室门牌号
	api['set_my_bedroom_number'] = (params = { }) => vm.$u.post('/api/school_information/set/mybedroom/number', params) 

	// 我的寝室门牌号
	api['mybedroom_number'] = (params = { }) => vm.$u.get('/api/school_information/mybedroom/number', params) 

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	
	vm.$u.api = api
}

export default {
	install
}
export {
	api
}