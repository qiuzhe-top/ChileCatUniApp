import http from '../interface'

// 请假类型
export const leave_type = (data) => {
	return http.request({
		url: 'ask/leave_type',
		method: 'GET',
		data
	})
}

// 请假条
export const draft = (data,method='GET') => {
	return http.request({
		url: 'ask/draft',
		method,
		data
	})
}
// 下载请假条
export const draft_exportword = (data,method='GET') => {
	return http.request({
		url: 'ask/exportword',
		method,
		data
	})
}
export default{
	leave_type,
	draft,
	draft_exportword
}