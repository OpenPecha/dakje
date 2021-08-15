import { createStore } from "vuex";

export const store = createStore({
  state: {
    sentence: ''
  },
  mutations: {
    change(state, sentence) {
      state.sentence = sentence
    }
  },
  getters: {
    sentence: state => state.sentence
  }
})
