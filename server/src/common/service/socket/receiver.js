const messages = require('./messages')
const UserModel = require('../../../components/user/model')

/**
 * Handles the data which comes from the client for the specific message.
 *
 * @param {Object} socket - the connection with the client.
 */
module.exports = (socket) => {
  // Handles the user position changed.
  socket.on(messages.user_position, (data) => {
    UserModel.update({ _id: data.userId }, { $set: { position: data.position } })
      .then((result) => { }).catch((err) => console.error(err))
  })
}
