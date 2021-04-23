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
// 今日缺勤列表
export const recordsearch = (data) => {
  return http.request({
    url: 'life/recordsearch',
    method: 'GET',
    data
  })
}
import user from '@/common/vmeitime-http/model/user.js'
import life from '@/common/vmeitime-http/model/life.js'
import activity from '@/common/vmeitime-http/model/activity.js'
import ask from '@/common/vmeitime-http/model/ask.js'
export default {
	user,
	life,
	activity,
	ask
}