const service = require('./service')

module.exports = (app) => {
  app.get('/api/semantic/accidents/stats/count', service.countAllSeverities)
}
