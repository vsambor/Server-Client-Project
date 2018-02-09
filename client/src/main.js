// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import i18n from './i18n'
import App from './App'
import store from './store'
import router from './router'
// import Axios from 'axios'
import Quasar, * as All from 'quasar-framework'
import VeeValidate from 'vee-validate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-framework/dist/quasar.mat.css'
import './main.scss'
import en from 'vee-validate/dist/locale/en'
import fr from 'vee-validate/dist/locale/fr'
import ro from 'vee-validate/dist/locale/ro'
import ar from 'vee-validate/dist/locale/ar'
import * as VueGoogleMaps from 'vue2-google-maps'

import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(VueSocketio, socketio('http://localhost:8083'))

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBa2imAC4TU9EHdK4YAV8PDy5Lzy7a7Lek',
    libraries: 'places, places, drawing, visualization'
  }
})

Vue.use(Quasar, { directives: All, components: All })
Vue.use(Vuex)
Vue.use(VeeValidate, {
  locale: i18n.locale,
  dictionary: {
    en: { messages: en.messages, attributes: i18n.messages.en.attributes },
    fr: { messages: fr.messages, attributes: i18n.messages.fr.attributes },
    ro: { messages: ro.messages, attributes: i18n.messages.ro.attributes },
    ar: { messages: ar.messages, attributes: i18n.messages.ar.attributes }
  }
})

Vue.config.productionTip = false
/* TODO - ACCEPT LANGUAGE -> Will be done later, is not a priority at the moment.
Axios.interceptors.request.use((config) => {
  // Add credentials to each request.
  config.withCredentials = true

  config.timeout = 10000

  if (config.method === 'patch' || config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    if (!config.headers) {
      config.headers = {}
    }
    // config.headers['X-XSRF-TOKEN'] = Vue.cookie.get('XSRF-TOKEN')
  }
  config.headers['Accept-Language'] = i18n.locale
  config.headers['Content-Type'] = 'application/json'
  return config
})
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: { App }
})
