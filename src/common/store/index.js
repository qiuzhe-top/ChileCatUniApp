import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import ask from './modules/ask'
import life from './modules/life'
import school_attendance from './modules/school_attendance'
import school_information from './modules/school_information.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
	life,
	school_information,
	school_attendance,
	ask
  },
  getters,
})

export default store
