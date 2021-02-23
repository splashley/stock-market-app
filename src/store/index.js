import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    returnedResult: undefined,
    error: undefined,
    result: undefined,
  },
  getters: {
    returnedResult: (state) => state.returnedResult,
    error: (state) => state.error,
    result: (state) => state.result,
  },
  mutations: {
    setReturnedResult(state, payload) {
      state.returnedResult = payload;
    },
    setResult(state, payload) {
      state.result = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
});
