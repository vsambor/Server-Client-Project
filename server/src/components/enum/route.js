const service = require('./service')

module.exports = (app) => {
  // Enumeration.
  app.get('/api/enums', service.findAll)
  app.get('/api/enums/:key', service.findByKey)
}
