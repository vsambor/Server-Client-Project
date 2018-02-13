const messsage = require('./messages')

exports.connect = (io) => {
  io.on(messsage.connect, (socket) => {
    console.log('Client socket connected.')
    require('./receiver')(socket)

    socket.on(messsage.disconnect, () => console.log('Client socket disconnected.'))
  })
}
