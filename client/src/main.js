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

Vue.use(Quasar, { directives: All, components: All })
Vue.use(Vuex)
Vue.use(VeeValidate)

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
