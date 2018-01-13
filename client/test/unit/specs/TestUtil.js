import Vue from 'vue'
import i18n from '../../../src/i18n'

module.exports = {
  getRenderedComponent(Component, propsData) {
    const Constructor = Vue.extend(Component)
    return new Constructor({
      i18n,
      propsData
    })
  }
}
