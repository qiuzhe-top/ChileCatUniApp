import http from '../interface'
// 验证验证码
export const idcode_post = (data) => {

    return http.request({
        url: 'life/idcode',
        method: 'POST', 
        data,
		// handle:true
    })
}
//  房间 -> 学生
export const  stupositioninfo = (data) => {
     return http.request({
        url: 'life/stupositioninfo',
        method: 'GET', 
		data
    })
}

// 获取验证码
export const idcode_get = (data) => {

    return http.request({
        url: 'life/idcode',
        method: 'GET', 
		// handle:true
    })
}
// 获取楼->层
export const buildinginfo = (data) => {
    return http.request({
        url: 'life/buildinginfo',
        method: 'GET', 
		
    })
}
// 获取层 -> 房间
export const roominfo = (data) => {
    return http.request({
        url: 'life/roominfo',
        method: 'GET',
		data
    })
}
// 晚缺勤公告
export const bulletin_life = (data) => {
    return http.request({
        url: 'life/recordsearch',
        method: 'GET',
		data
    })
}
//  提交记录
export const studentleak = (data) => {
    return http.request({
        url: 'life/studentleak',
        method: 'POST', 
		data,
		handle:true
    })
}
export default {
	idcode_get,
	idcode_post,
	buildinginfo,
	roominfo,
	stupositioninfo,
	studentleak,
	bulletin_life
}