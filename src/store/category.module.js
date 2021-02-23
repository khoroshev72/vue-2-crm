import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async createCategory({commit, dispatch}, {name, limit}) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({name, limit})
        return {name, limit, id: category.key}
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    },
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val()
        if (categories) {
          return Object.keys(categories).map(id => {
            return {...categories[id], id}
          })
        }
        return []
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {id, name, limit}) {
      try {
        const uid = await dispatch('auth/getUserId', null, {root: true})
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({name, limit})
      } catch (e) {
        commit('setError', e, {root: true})
        throw e
      }
    }
  }
}