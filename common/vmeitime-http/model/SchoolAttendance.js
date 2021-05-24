import http from '../interface'

// 获取我的活动
export const task_executor = (data) => {

    return http.request({
        url: 'school_attendance/task_executor',
        method: 'GET', 
        data,
		// handle:true
    })
}

//  查寝数据
export const  task_room_info = (data) => {
     return http.request({
        url: 'school_attendance/task_room_info',
        method: 'GET', 
		data
    })
}

// 查寝提交
export const  submit = (data) => {
     return http.request({
        url: 'school_attendance/submit',
        method: 'POST', 
		data
    })
}
// 获取规则
export const  rule = (data) => {
     return http.request({
        url: 'school_attendance/rule',
        method: 'GET', 
		data
    })
}

export default{
	task_executor,
	rule,
	submit,
	task_room_info
}