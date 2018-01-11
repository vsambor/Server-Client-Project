const service = require('./service')

module.exports = (app) => {
  app.post('/api/team', service.add)
  app.get('/api/teams', service.findAll)
  app.get('/api/team/:id', service.findById)
  app.put('/api/team/:id', service.update)
  app.delete('/api/team/:id', service.delete)

  // Team members routes.
  app.post('/api/team/:teamId/member/:memberId', service.addMember)
  app.delete('/api/team/:teamId/member/:memberId', service.deleteMember)
}
