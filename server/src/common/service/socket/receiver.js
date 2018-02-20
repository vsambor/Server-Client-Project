const messages = require('./messages')
const UserModel = require('../../../components/user/model')
const AccidentModel = require('../../../components/accident/model')
const socketSender = require('./sender')

/**
 * Handles the data which comes from the client for the specific message.
 *
 * @param {Object} socket - the connection with the client.
 */
module.exports = (socket) => {
  // Handles the user position changed.
  socket.on(messages.user_position, (data) => {
    UserModel.update({ _id: data.userId }, { $set: { position: data.position } })
      .then((result) => { console.log('updated') }).catch((err) => console.error(err))

    // Finds proximity accidents only if user is in avoid accidents mode.
    if (data.avoidAccidents) {
      // Checks if there are accidents in proximity and notify user if so.
      AccidentModel.find({
        position: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [data.position.coordinates[0], data.position.coordinates[1]]
            },

            // In meeters.
            $maxDistance: data.userAvoidProximity
          }
        }
      }).then((accidents) => {
        for (let i = 0; i < accidents.length; ++i) {
          let currAccidentCoord = accidents[i].position.coordinates

          // Skip the accidents which has been already notified in the same a->b direction.
          // Note: the very same accident can be re-notified, but only with a new direction.
          if (checkLastNotified(data.lastNotifiedAccident, currAccidentCoord)) {
            continue
          }

          // Create a notification.
          let nearAccidentFound = {
            title: 'Accident in proximity',
            body: `There is an accident in your proximity (${data.userAvoidProximity}m), at location ${currAccidentCoord}`,
            date: Date.now()
          }

          // Saves the notification in the database and then it pushes it via socket to the user.
          UserModel.findByIdAndUpdate(data.userId, { $push: { notifications: nearAccidentFound } }, { safe: true, upsert: true, new: true })
            .then(updatedUser => {
              socketSender.sendNotification(socket, updatedUser.notifications.pop())
            })

          socketSender.sendProximityAccident(socket, { center: { lat: currAccidentCoord[1], lng: currAccidentCoord[0] } })
        }
      })
    }
  })
}

/**
 * Checks if the last notified coordinates are the same as curent found accident, to not notify multiple times.
 *
 * @param {Object} last - the last notified coordinates send from frontend
 * @param {Object} curr - the current accident to be checked
 */
function checkLastNotified(last, curr) {
  if (!last) {
    return false
  }

  return last.lat === curr[1] && last.lng === curr[0]
}
