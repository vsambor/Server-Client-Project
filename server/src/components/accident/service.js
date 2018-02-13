const AccidentModel = require('./model')
const UserModel = require('../user/model')
const errorHandler = require('../../common/util/errorUtil')
const restUtil = require('../../common/util/restUtil')
const socketSender = require('../../common/service/socket/sender')

exports.add = (req, res) => {
  let newAccident = new AccidentModel(req.body)

  // Updates all comments dates, since only the <accident> model has timestamp by default.
  newAccident.comments.forEach(comment => {
    comment.createdAt = comment.updatedAt = Date.now()
  })

  let accidentNotification = {
    title: res.__('notification.new_accident.title'),
    body: res.__('notification.new_accident.body', newAccident.position.coordinates.join(',')),
    date: Date.now()
  }

  UserModel.find({
    position: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [newAccident.position.coordinates[0], newAccident.position.coordinates[1]]
        },

        // Times 1000 because maxDistance is expressed in meters.T he max proximity each user has in settings.
        $maxDistance: 100 * 1000
      }
    }
  }).then((users) => {
    let pushOnce = false

    for (let i = 0; i < users.length; ++i) {
      let currUser = users[i]

      // Don't send notifications for users who disabled this feature in their settings.
      if (currUser.settings.showNotification === false) {
        continue
      }

      UserModel.findByIdAndUpdate(currUser._id, { $push: { notifications: accidentNotification } }, { safe: true, upsert: true, new: true })
        .then(updatedUser => {
          // Send the last added notification only once for all users in the loop. (we don't handle each socket separately atm)
          if (!pushOnce) {
            pushOnce = true
            socketSender.sendNotification(req.app.get('socketio'), updatedUser.notifications.pop())
          }
        })
    }
  })

  newAccident.save(newAccident)
    .then(() => res.status(201).json({
      success: true,
      message: res.__('success.add'),
      accident: newAccident
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.findAll = (req, res) => {
  restUtil.findAllWithOptions(AccidentModel, req.query)
    .then(result => res.status(200).send({
      success: true,
      count: result.length,
      accidents: result
    }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.findById = (req, res) => {
  AccidentModel.findById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch((err) => errorHandler.handle(err, res))
}

exports.update = (req, res) => {
  AccidentModel.findOneAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then(result => res.status(202).send({
      success: true,
      message: res.__('success.update'),
      data: result
    }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.delete = (req, res) => {
  AccidentModel.findByIdAndRemove(req.params.id)
    .then(result => res.status(200).send({
      success: true,
      message: res.__('success.delete')
    }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.addComment = (req, res) => {
  let comment = req.body
  comment.createdAt = comment.updatedAt = Date.now()
  AccidentModel.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { safe: true, upsert: true, new: true })
    .then((result) => res.status(201).json({
      success: true,
      message: res.__('success.add'),
      user: result
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.deleteComment = (req, res) => {
  AccidentModel.findByIdAndUpdate(req.params.id, { $pull: { comments: { _id: req.params.commentId } } }, { new: true })
    .then(result => res.status(200).json({
      success: true,
      message: res.__('success.delete'),
      user: result
    }))
    .catch(err => errorHandler.handle(err, res))
}
