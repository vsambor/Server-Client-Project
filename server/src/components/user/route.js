const service = require('./service')

module.exports = (app) => {
  // User's main routes.
  app.post('/api/users', service.add)
  app.get('/api/users', service.findAll)
  app.get('/api/users/:id', service.findById)
  app.put('/api/users/:id', service.update)
  app.delete('/api/users/:id', service.delete)
  app.get('/users/activation/:token', service.activate)

  // User's vehicle routes.
  app.post('/api/users/:id/vehicles', service.addVehicle)
  app.delete('/api/users/:id/vehicles/:vehicleId', service.deleteVehicle)

  // User's settings routes.
  app.get('/api/users/:id/settings', service.findSettings)
  app.put('/api/users/:id/settings', service.updateSettings)
}