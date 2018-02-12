const messsage = require('./messages')

exports.connect = (io) => {
  io.on(messsage.connection, (socket) => {
    console.log('Client socket connected.')
    require('./receiver')(socket)
  })
}
