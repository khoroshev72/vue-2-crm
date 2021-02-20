import firebase from 'firebase/app'

export default {
  namespaced: true,
  actions: {
    async login({commit, dispatch}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async logout({commit, dispatch}) {
      try {
        await firebase.auth().signOut()
      } catch (e) {
        throw e
      }
    },
    async getUserId({commit, dispatch}) {
      const user = await firebase.auth().currentUser
      return user ? user.uid : null
    },
    async register({commit, dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const id = await dispatch('getUserId')
        await firebase.database().ref(`/users/${id}/info`).set({
          name,
          balance: 42000
        })
      } catch (e) {
        throw e
      }
    }
  }
}