import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // When there are multiple store modules.
  // modules: {},
  state: {
    shortAppName: 'SCP',
    appName: 'Server Client Project',
    authToken: null,
    isLogged: false,
    currentUser: null,
    currentTheme: 'secondary'
  },
  mutations: {
    setAuthToken(state, value) {
      state.authToken = value
    },
    setCurrentUser(state, value) {
      state.currentUser = value
      state.isLogged = true
      state.currentTheme = value.settings.appTheme
    },
    setCurrentTheme(state, value) {
      state.currentTheme = value
    },
    logout(state) {
      state.authToken = null
      state.isLogged = false
      state.currentUser = null
      state.currentTheme = 'secondary'
    }
  },
  getters: {
    authToken: state => state.authToken,
    isLogged: state => state.isLogged,
    currentUser: state => state.currentUser,
    currentTheme: state => state.currentTheme
  }
  // To do things async
  // actions: { }
})
