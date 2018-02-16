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
  app.get('/api/users/:id/vehicles', service.findVehicles)
  app.delete('/api/users/:id/vehicles/:vehicleId', service.deleteVehicle)
  app.put('/api/users/:id/vehicles/:vehicleId', service.updateVehicle)

  // User's settings routes.
  app.get('/api/users/:id/settings', service.findSettings)
  app.put('/api/users/:id/settings', service.updateSettings)

  // User's notifications routes.
  app.get('/api/users/:id/notifications', service.findAllNotifications)
  app.get('/api/users/:id/notifications/:notificationId', service.findNotificationById)
  app.put('/api/users/:id/notifications/:notificationId', service.updateNotification)
  app.delete('/api/users/:id/notifications/:notificationIds', service.deleteNotifications)
}
