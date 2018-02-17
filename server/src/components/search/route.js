const service = require('./service')

module.exports = (app) => {
  app.post('/api/semantic/engine/search', service.searchAccidents)
}
