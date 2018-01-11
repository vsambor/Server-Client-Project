const service = require('./service')

module.exports = (app) => {
  app.post('/api/user', service.add)
  app.get('/api/users', service.findAll)
  app.get('/api/user/:id', service.findById)
  app.put('/api/user/:id', service.update)
  app.delete('/api/user/:id', service.delete)
}
