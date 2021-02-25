import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async createRecord({commit, dispatch}, record) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    },
    async fetchRecords({commit, dispatch}) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

        return Object.keys(records).map(id => {
          return {...records[id], id}
        })

      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    }
  }
}