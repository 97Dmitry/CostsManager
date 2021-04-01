import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({commit, dispatch}, recordData) {
      try {
        const uid = await dispatch("getUid")
        await firebase.database().ref(`/users/${uid}/records`).push(recordData)
      } catch (e) {
        commit("setError", e)
        throw e
      }
    }
  }
}