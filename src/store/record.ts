import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({ commit, dispatch }, recordData) {
      try {
        const uid = await dispatch("getUid");
        await firebase.database().ref(`/users/${uid}/records`).push(recordData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once("value")
          ).val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordByID({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
