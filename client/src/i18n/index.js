import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import fr from './fr'
import ro from './ro'
import ar from './ar'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en, fr, ro, ar
  }
})
