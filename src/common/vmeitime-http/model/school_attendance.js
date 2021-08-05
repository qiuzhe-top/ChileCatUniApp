import http from '../interface'
export default {
	// TpiStart
/**
 * 获取任务
 * @param  [type, 任务类型, Char, 是, , 0晚查寝 1查卫生 2晚自修, max_length:1]
 * @returns {} {"is_open":"是否开启","name":"Name","id":"ID"}
*/
task_obtain(data) {
 return http.request({
 url: '/api/school_attendance/task/obtain',
 method: 'post',
 data
 })
},
/**
 * 开启/关闭任务
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} {"is_open":"是否开启"}
*/
task_switch(data) {
 return http.request({
 url: '/api/school_attendance/task/switch',
 method: 'post',
 data
 })
},
/**
 * 重置查寝任务状态
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} null
*/
task_rest_knowing(data) {
 return http.request({
 url: '/api/school_attendance/task/rest/knowing',
 method: 'post',
 data
 })
},
/**
 * 重置晚自习任务状态
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} null
*/
task_rest_late(data) {
 return http.request({
 url: '/api/school_attendance/task/rest/late',
 method: 'post',
 data
 })
},
/**
 * 获取班表
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} null
*/
scheduling(data) {
 return http.request({
 url: '/api/school_attendance/scheduling',
 method: 'post',
 data
 })
},
/**
 * 修改查寝班表
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @param  [roster, 班表, JSON, 是, , , ]
 * @returns {} null
*/
scheduling_update_knowing(data) {
 return http.request({
 url: '/api/school_attendance/scheduling/update/knowing',
 method: 'post',
 data
 })
},
/**
 * 修改晚自习班表
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @param  [roster, 班表, JSON, 是, , , ]
 * @returns {} null
*/
scheduling_update_late(data) {
 return http.request({
 url: '/api/school_attendance/scheduling/update/late',
 method: 'post',
 data
 })
},
/**
 * 考勤学生记录情况
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} {"student_approved":"Student approved","student_approved_number":"Student approved number","score":"分值","star_time":"创建日期","rule_str":"原因","id":"ID","worker":"Worker","room_str":"寝室"}
*/
condition(data) {
 return http.request({
 url: '/api/school_attendance/condition',
 method: 'post',
 data
 })
},
/**
 * 销假(必须为任务管理员)
 * @param  [record_id, 考勤记录ID, Char, 是, , , max_length:8]
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} null
*/
undo_record(data) {
 return http.request({
 url: '/api/school_attendance/undo/record',
 method: 'post',
 data
 })
},
/**
 * 销假(任意任务)
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @param  [record_id, 考勤记录ID, Char, 是, , , max_length:8]
 * @returns {} null
*/
undo_record_admin(data) {
 return http.request({
 url: '/api/school_attendance/undo/record/admin',
 method: 'post',
 data
 })
},
/**
 * 导入早签数据
 * @param  [file, Excel文件, File, 是, , , ]
 * @returns {} null
*/
inzaoqian_excel(data) {
 return http.request({
 url: '/api/school_attendance/inzaoqian/excel',
 method: 'post',
 data
 })
},
/**
 * 工作者获取任务
 * @returns {} {"is_finish":"是否完成","id":"Id","title":"Title","type":"Type"}
*/
task_executor(data) {
 return http.request({
 url: '/api/school_attendance/task/executor',
 method: 'post',
 data
 })
},
/**
 * 查寝当天数据导出
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @param  [token, token, Char, 是, , , ]
 * @returns {} {"created_time":"Created time","room_name":"Room name","student_name":"Student name","reason":"Reason","classname":"Classname","student":"Student"}
*/
knowing_excel_out(data) {
 return http.request({
 url: '/api/school_attendance/knowing/excel/out',
 method: 'post',
 data
 })
},
/**
 * 导出今日记录情况
 * @param  [username, 用户名, Char, 否, None, , ]
 * @param  [start_date, 开始日期, Date, 否, 2021-07-30, , ]
 * @param  [end_date, 结束日期, Date, 否, 2021-07-30, , ]
 * @returns {} null
*/
out_data(data) {
 return http.request({
 url: '/api/school_attendance/out/data',
 method: 'post',
 data
 })
},
/**
 * 获取规则
 * @param  [codename, 规则编号, Char, 是, , , ]
 * @returns {} null
*/
rule(data) {
 return http.request({
 url: '/api/school_attendance/rule',
 method: 'post',
 data
 })
},
/**
 * 晚自习考勤 违纪提交
 * @param  [task_id, 任务ID, Char, 是, , , ]
 * @param  [username, 用户名, Char, 是, , , ]
 * @param  [role_name, 自定义规则名称, Char, 否, None, , ]
 * @param  [role_score, 自定义规则分数, Char, 否, None, , ]
 * @param  [rule_id_list, 规则ID列表, List, 否, None, , child:( _Unvalidated 默认值:,是否必填:是, None)]
 * @returns {} null
*/
submit_late_discipline(data) {
 return http.request({
 url: '/api/school_attendance/submit/late/discipline',
 method: 'post',
 data
 })
},
/**
 * 晚自习考勤 点名提交
 * @param  [task_id, 任务ID, Char, 是, , , ]
 * @param  [flg, 是否第一次点名, Boolean, 是, , , ]
 * @param  [rule_id, 规则ID, Char, 是, , , ]
 * @param  [user_list, 被记录用户列表, List, 是, , , child:( _Unvalidated 默认值:,是否必填:是, None)]
 * @returns {} null
*/
submit_late(data) {
 return http.request({
 url: '/api/school_attendance/submit/late',
 method: 'post',
 data
 })
},
/**
 * 寝室考勤 点名提交
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @param  [room_id, 房间ID, Char, 是, , , ]
 * @param  [rule_id, 规则ID, Char, 是, , , ]
 * @param  [user_list, 被记录用户列表, List, 是, , , child:( _Unvalidated 默认值:,是否必填:是, None)]
 * @returns {} null
*/
submit_knowing(data) {
 return http.request({
 url: '/api/school_attendance/submit/knowing',
 method: 'post',
 data
 })
},
/**
 * 晚查寝-楼工作数据
 * @param  [task_id, 任务id, Char, 是, , , max_length:8]
 * @returns {} null
*/
knowing_storey_info(data) {
 return http.request({
 url: '/api/school_attendance/knowing/storey/info',
 method: 'post',
 data
 })
},
/**
 * 晚查寝-层工作数据
 * @param  [task_id, 任务ID, Char, 是, , , ]
 * @param  [floor_id, 楼层ID, Char, 是, , , ]
 * @returns {} null
*/
knowing_room_info(data) {
 return http.request({
 url: '/api/school_attendance/knowing/room/info',
 method: 'post',
 data
 })
},
/**
 * 晚查寝-房间工作数据
 * @param  [task_id, 任务ID, Char, 是, , , ]
 * @param  [room_id, 房间ID, Char, 是, , , ]
 * @returns {} null
*/
knowing_student_room_info(data) {
 return http.request({
 url: '/api/school_attendance/knowing/student/room/info',
 method: 'post',
 data
 })
},
/**
 * 学生查看公告
 * @returns {} {"room_name":"Room name","student_name":"Student name","reason":"Reason","created_time":"Created time","classname":"Classname","student":"Student"}
*/
student_disciplinary(data) {
 return http.request({
 url: '/api/school_attendance/student/disciplinary',
 method: 'post',
 data
 })
},
/**
 * 晚自修数据
 * @param  [task_id, 任务ID, Char, 是, , , ]
 * @param  [rule_id, 规则ID, Char, 否, None, , ]
 * @param  [class_id, 班级ID, Char, 否, None, , ]
 * @param  [type, 0 # 获取任务绑定的班级 1 # 获取班级名单附带学生多次点名情况, Char, 是, , , ]
 * @returns {} null
*/
late_class(data) {
 return http.request({
 url: '/api/school_attendance/late/class',
 method: 'post',
 data
 })
},
/**
 * 考勤查询
 * @param  [username, 用户名, Char, 否, None, , ]
 * @param  [start_date, 开始时间, Char, 是, , , ]
 * @param  [end_date, 结束时间, Char, 是, , , ]
 * @returns {} null
*/
record_query(data) {
 return http.request({
 url: '/api/school_attendance/record/query',
 method: 'post',
 data
 })
},

/**
 * 个人违纪记录
 * @param {Object} data
 */
personal_discipline_query(data) {
 return http.request({
 url: '/api/school_attendance/personal/discipline/query',
 method: 'post',
 data
 })
},

// TpiEnd
}
