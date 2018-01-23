import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // When there are multiple store modules.
  // modules: {},
  state: {
    shortAppName: 'SCP',
    appName: 'Server Client Project',
    isLogged: false,
    currentUser: null,
    currentTheme: 'secondary'
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value
      state.isLogged = true
    },
    setCurrentTheme(state, value) {
      state.currentTheme = value
    },
    logout(state) {
      state.isLogged = false
      state.currentUser = null
    }
  },
  getters: {
    isLogged: state => state.isLogged,
    currentUser: state => state.currentUser,
    currentTheme: state => state.currentTheme
  }
  // To do things async
  // actions: { }
})
