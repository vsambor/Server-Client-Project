import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fr from './fr'
import en from './en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})
