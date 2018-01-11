const path = require('path')

var configBase = {
  root: path.normalize(path.join(__dirname, '..')),
  app: {
    name: 'server-client-project'
  },
  db: {
    url: 'mongodb://localhost/scp'
  }
}

var test = JSON.parse(JSON.stringify(configBase))
// test.db = // test environment db connection information

var production = JSON.parse(JSON.stringify(configBase))
// production.db = // production environment db connection information

module.exports = {
  development: configBase,
  test: test,
  production: production
}
