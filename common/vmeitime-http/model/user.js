import http from '../interface'

// 登录
export const login = (data) => {
    return http.request({
        url: 'user/auth',
        method: 'POST', 
        data,
		// handle:true
    })
}
// 验证token
export const ValidationToken = (data) => {
    return http.request({
        url: 'life/validationToken',
        method: 'POST', 
    })
}

// 获取个人信息
export const getInformation = (data) => {
    return http.request({
        url: 'user/information',
        method: 'get', 
    })
}

// 心情
export const mood = (data) =>{
	return http.request({
		url:'user/mymood',
		method: 'post',
	})
}

// 活动打卡
export const activeity = (data) =>{
	return http.request({
		url:'user/activeity',
		method:'get',
		data
	})
}
export default {
	login,
	ValidationToken,
	getInformation,
	activeity
}