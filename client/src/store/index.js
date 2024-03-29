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
    isAdmin: false,
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
      state.isAdmin = value.role === 'ADMIN'
      state.isLogged = true
      state.currentTheme = value.settings.appTheme
    },
    setCurrentUserSettings(state, value) {
      state.currentUser.settings = value
    },
    setCurrentTheme(state, value) {
      state.currentTheme = value
    },
    logout(state) {
      state.authToken = null
      state.isAdmin = false
      state.isLogged = false
      state.currentUser = null
      state.currentTheme = 'secondary'
    }
  },
  getters: {
    authToken: state => state.authToken,
    isAdmin: state => state.isAdmin,
    isLogged: state => state.isLogged,
    currentUser: state => state.currentUser,
    currentUserSettings: state => state.currentUser.settings,
    currentTheme: state => state.currentTheme
  }
  // To do things async
  // actions: { }
})
