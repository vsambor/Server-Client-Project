const messages = require('./messages')

exports.sendNotification = (io, data) => {
  io.emit(messages.send_notification, data)
}

exports.sendProximityAccident = (io, data) => {
  io.emit(messages.send_proximity_accident, data)
}
