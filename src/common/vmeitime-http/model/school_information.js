import http from '../interface'
export default {
	// TpiStart
/**
 * 考勤 获取用户基本信息
 * @param  [username, 用户名, Char, 是, , , max_length:25]
 * @returns {} {"grade":"Grade","name":"Name","tel":"Tel","id":"ID","username":"用户名"}
*/
student_information(data) {
 return http.request({
 url: '/api/school_information/student/information',
 method: 'post',
 data
 })
},

/**
 * @param {Object} data
 * 修改床位
 */
update_beds(data) {
 return http.request({
 url: '/api/school_information/update/beds',
 method: 'post',
 data
 })
},
/**
 * @param {Object} data
 * 我的寝室信息
 */
mybedroom(data) {
 return http.request({
 url: '/api/school_information/mybedroom',
 method: 'post',
 data
 })
},
// TpiEnd
}
