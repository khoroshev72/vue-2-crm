import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'
import info from './info.module'
import category from './category.module'
import record from './record.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error(state) {
      return state.error
    }
  },
  modules: {auth, info, category, record}
})
