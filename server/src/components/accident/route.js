const service = require('./service')

module.exports = (app) => {
  // Accident's main routes.
  app.post('/api/accidents', service.add)
  app.get('/api/accidents', service.findAll)
  app.get('/api/accidents/:id', service.findById)
  app.put('/api/accidents/:id', service.update)
  app.delete('/api/accidents/:id', service.delete)

  // Accident's comments routes.
  app.post('/api/accidents/:id/comments', service.addComment)
  app.get('/api/accidents/:id/comments', service.findComments)
  app.put('/api/accidents/:id/comments/:commentId', service.updateComment)
  app.delete('/api/accidents/:id/comments/:commentId', service.deleteComment)
  app.put('/api/accidents/:id/vote', service.updateVote)
}
