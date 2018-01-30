module.exports = (app) => {
  // Index routes.
  app.get('/', (req, res) => res.status(200).send(res.__('general.home')))

  // Application routes.
  require('../src/auth').route(app)
  require('../src/user').route(app)
  require('../src/accident').route(app)

  // Handles non existing routes i.e 404.
  app.use((req, res) => res.status(404).send({ url: req.originalUrl + ' ' + res.__('general.notFound') }))
}
