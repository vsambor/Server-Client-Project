// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import i18n from './i18n'
import App from './App'
import store from './store'
import router from './router'
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  template: '<App/>',
  components: { App }
})
