const mongoose = require('mongoose')

exports.connect = (uri) => {
  mongoose.Promise = global.Promise
  mongoose.connect(uri, { useMongoClient: true })
    .then((res) => {
      console.log(`Mongoose connected at ${uri}`)

      // The main populator handles the database population.
      require('../src/common/populator/mainPopulator').populate()
    })
    .catch((err) => console.error('Database connection error' + err))
}
