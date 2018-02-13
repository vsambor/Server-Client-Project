module.exports = (app) => {
  // Index routes.
  app.get('/', (req, res) => res.status(200).send(res.__('general.home')))

  // Application routes.
  require('../src/components/auth').route(app)
  require('../src/components/user').route(app)
  require('../src/components/accident').route(app)
  require('../src/components/enum').route(app)

  // Handles non existing routes i.e 404.
  app.use((req, res) => res.status(404).send({ url: req.originalUrl + ' ' + res.__('general.notFound') }))
}
