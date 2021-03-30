import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (s) => s.error,
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);
      return await res.json();
    },
  },
  modules: {
    auth,
    info,
    category,
  },
});
