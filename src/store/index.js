import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: undefined,
    error: undefined,
  },
  getters: {
    results: (state) => state.results,
    error: (state) => state.error,
  },
  mutations: {
    setResults(state, payload) {
      state.results = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
});
