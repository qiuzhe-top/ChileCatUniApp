import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import ask from './modules/ask'
import life from './modules/life'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
	life,
	ask
  },
  getters,
})

export default store
