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

  // TpiEnd
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
