const service = require('./service')

module.exports = (app) => {
  app.post('/api/member', service.add)
  app.get('/api/members', service.findAll)
  app.get('/api/member/:id', service.findById)
  app.put('/api/member/:id', service.update)
  app.delete('/api/member/:id', service.delete)
}
