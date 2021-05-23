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
export default{
	task_executor,
	task_room_info
}