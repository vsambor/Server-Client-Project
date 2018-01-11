import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // When there are multiple store modules.
  // modules: {},
  state: {
    isLogged: false,
    currentUser: null,
    currentLanguage: 'en'
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value
      state.isLogged = true
    },
    setCurrentLanguage(state, value) {
      state.currentLanguage = value
    },
    logout(state) {
      state.isLogged = false
      state.currentUser = null
    }
  },
  getters: {
    isLogged: state => state.isLogged,
    currentUser: state => state.currentUser,
    currentLanguage: state => state.currentLanguage
  }
  // To do things async
  // actions: { }
})
