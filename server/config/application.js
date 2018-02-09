const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8081
const socketPort = process.env.SOCKET_PORT || 8083
const packageJson = require('../../package.json')
const i18n = require('./i18n')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const compress = require('compression')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const config = require('./config')[env]
const auth = require('../middleware/auth')
const app = express()
const socketServer = require('http').createServer()
const io = require('socket.io')(socketServer)

// This way it can be used in components. ex: req.app.get('socketio').
app.set('socketio', io)

console.log(`Loading App in ${env} mode.`)

if (!config) {
  console.log(`ERROR: No config specified for ${env} environment.`)
  process.exit(1)
}

// Midlewares
app.use(i18n.init)
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(auth().initialize())

// Bootstrap the routes.
require('./routes')(app)

// Connects to the database.
require('./database.js').connect(process.env.DATABASE_URL || config.db.url)

exports.start = () => {
  app.listen(port, () => console.log(`Running App Version ${packageJson.version} on port ${port} in ${env} mode`))
}

exports.startSocket = () => {
  socketServer.listen(socketPort)
  console.log(`Running Socket SCP server on port ${socketPort}`)

  // Setups the socket connection, messages, senders and receivers.
  require('../src/common/service/socket').connect(io)
}
