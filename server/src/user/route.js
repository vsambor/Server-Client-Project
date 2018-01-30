const service = require('./service')

module.exports = (app) => {
  app.post('/api/users', service.add)
  app.get('/api/users', service.findAll)
  app.get('/api/users/:id', service.findById)
  app.put('/api/users/:id', service.update)
  app.delete('/api/users/:id', service.delete)
  app.get('/auth/:token', service.activate)
}
