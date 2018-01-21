const service = require('./service')

module.exports = (app) => {
  app.post('/api/auth/login', service.login)
}
