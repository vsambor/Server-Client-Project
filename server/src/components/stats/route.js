const service = require('./service')

module.exports = (app) => {
  app.get('/api/semantic/accidents/stats/count/severity', service.countAllSeverities)
  app.get('/api/semantic/accidents/stats/count/collision', service.countWithAndWithoutCol)
  app.get('/api/semantic/accidents/stats/count/collivehicules', service.countWithColWithVehiAndWithout)
  app.get('/api/semantic/accidents/stats/count/collivehiculekind', service.countWithVehKinds)
}
