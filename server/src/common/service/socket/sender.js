const messages = require('./messages')

exports.sendNotification = (io, data) => {
  io.emit(messages.send_notification, data)
}
