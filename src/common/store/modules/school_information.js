import store from '../../store'
import api from '@/common/vmeitime-http/model/school_information.js'
const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}
const actions = {
  // TpiStart

  // 考勤 获取用户基本信息
  student_information({ commit }, request) {
    console.log('获取用户基本信息')
    return new Promise((resolve, reject) => {
      api
        .student_information(request)
        .then(response => {
          const { grade, name, tel, id, username } = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 修改床位
  update_beds({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .update_beds(request)
        .then(response => {
			uni.showToast({
				title: '修改成功,请刷新页面',
				icon: "none",
				duration: 2000
			});
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 我的寝室信息
  mybedroom({ commit }, request) {
    return new Promise((resolve, reject) => {
      api
        .mybedroom(request)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // TpiEnd
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
