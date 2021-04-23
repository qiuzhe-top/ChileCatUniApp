import http from '../interface'
// 验证验证码
export const myactive = (data) => {

    return http.request({
        url: 'activity/myactive',
        method: 'GET', 
        data,
		// handle:true
    })
}

export default {
	myactive,
}