import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

// 轮播图
export const login = (data) => {
    return http.request({
        url: 'user/auth',
        method: 'POST', 
        data,
		// handle:true
    })
}
// 验证验证码
export const idcode_post = (data) => {
    return http.request({
        url: 'life/idcode',
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
		// handle:true
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
//  房间 -> 学生
export const stupositioninfo = (data) => {
    return http.request({
        url: 'life/stupositioninfo',
        method: 'GET', 
		data
    })
}
// 今日缺勤列表
export const recordsearch = (data) => {
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
// 
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test,
    login,
	idcode_get,
	idcode_post,
	buildinginfo,
	roominfo,
	stupositioninfo,
	studentleak,
	recordsearch,
}