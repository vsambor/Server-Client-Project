const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8081
const packageJson = require('../../package.json')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const compress = require('compression')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const app = express()
const config = require('./config')[env]

console.log(`Loading App in ${env} mode.`)

if (!config) {
  console.log(`ERROR: No config specified for ${env} environment.`)
  process.exit(1)
}

// Midlewares
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

// Bootstrap the routes.
require('./routes')(app)

// Connects to the database.
require('./database.js')(process.env.DATABASE_URL || config.db.url)

exports.start = () => {
  app.listen(port, () => console.log(`Running App Version ${packageJson.version} on port ${port} in ${env} mode`))
}
