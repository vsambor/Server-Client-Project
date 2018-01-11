module.exports = (app) => {
  // Index routes.
  app.get('/', (req, res) => res.status(200).send('Please check /api routes'))

  // Application routes.
  require('../src/user').route(app)
  require('../src/member').route(app)
  require('../src/team').route(app)

  // Handles non existing routes i.e 404.
  app.use((req, res) => res.status(404).send({ url: req.originalUrl + ' not found' }))
}
