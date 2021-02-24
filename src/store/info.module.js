import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({commit, dispatch}) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e, {root:true})
      }
    },
    async updateInfo({commit, dispatch, getters}, updated) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        const updatedInfo = {...getters.getInfo, ...updated}
        await firebase.database().ref(`/users/${uid}/info`).update(updatedInfo)
        commit('setInfo', updatedInfo)
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    },
    async fetchCurr() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,EUR,USD`)
      return await res.json()
    }
  },
  getters: {
    getInfo: s => s.info
  }
}