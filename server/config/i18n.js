const i18n = require('i18n')
const path = require('path')

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '../src/i18n/'),
  defaultLocale: 'en'
})

module.exports = i18n
