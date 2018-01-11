const mongoose = require('mongoose')

function connect(uri) {
  mongoose.Promise = global.Promise
  mongoose.connect(uri, { useMongoClient: true })
    .then(() => console.log(`Mongoose connected at ${uri}`))
    .catch(() => console.error('Database connection error'))
}

module.exports = connect
