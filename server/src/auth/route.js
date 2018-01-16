const service = require('./service')

module.exports = (app) => {
  app.post('/api/login', service.login)
}
