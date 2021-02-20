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
    }
  }
}