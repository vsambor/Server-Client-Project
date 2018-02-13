const UserModel = require('./model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../../common/util/errorUtil')
const mailer = require('../../common/service/mailer')
const crypto = require('crypto')
const restUtil = require('../../common/util/restUtil')
const mongoose = require('mongoose')

exports.add = (req, res) => {
  let newUser = new UserModel(req.body)
  newUser.token = crypto.createHash('sha1').update(Date.now().toString() + Math.random().toString()).digest('hex')
  newUser.password = bcrypt.hashSync(newUser.password)

  newUser.save(newUser)
    .then(() => {
      mailer.send(newUser.email, res.__('mail.subject.userCreated'), res.__('mail.activation', 'http://localhost:8081/users/activation/' + newUser.token))
      res.status(201).json({
        success: true,
        message: res.__('success.add'),
        user: newUser
      })
    })
    .catch(err => errorHandler.handle(err, res))
}

exports.findAll = (req, res) => {
  restUtil.findAllWithOptions(UserModel, req.query)
    .then(users => {
      // Cleans all users password before sending to client (for security reasons).
      users.forEach(user => (user.password = null))

      res.status(200).send({
        success: true,
        count: users.length,
        users: users
      })
    })
    .catch((err) => errorHandler.handle(err, res))
}

exports.findById = (req, res) => {
  UserModel.findById(req.params.id)
    .then(user => {
      user.password = null
      res.status(200).send({ success: true, user: user })
    })
    .catch((err) => errorHandler.handle(err, res))
}

exports.update = (req, res) => {
  UserModel.findOneAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then(user => res.status(202).send({
      success: true,
      message: res.__('success.update'),
      user: user
    }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.delete = (req, res) => {
  UserModel.findByIdAndRemove(req.params.id)
    .then(result => res.status(200).send({
      success: true,
      message: res.__('success.delete')
    }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.activate = (req, res) => {
  UserModel.findOneAndUpdate({ token: req.params.token }, { isActive: true, token: '' })
    .then(result => res.status(202).send({
      success: true,
      message: res._('user.activation'),
      data: result
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.addVehicle = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, { $push: { vehicles: req.body } }, { safe: true, upsert: true, new: true })
    .then((result) => res.status(201).json({
      success: true,
      message: res.__('success.add'),
      user: result
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.deleteVehicle = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, { $pull: { vehicles: { _id: req.params.vehicleId } } }, { new: true })
    .then(result => res.status(200).json({
      success: true,
      message: res.__('success.delete'),
      user: result
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.findVehicles = (req, res) => {
  UserModel.findById(req.params.id)
    .then(user => res.status(200).send({ success: true, vehicles: user.vehicles }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.updateVehicles = (req, res) => {
  UserModel.update(
    { _id: req.params.id, vehicles: { $elemMatch: { _id: req.params.vehicleId } } },
    { $set: restUtil.bindUpdateFields('vehicles', req.body) },
    { new: true })
    .then((result) => res.status(202).json({
      success: true,
      message: res.__('success.update')
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.findSettings = (req, res) => {
  UserModel.findById(req.params.id)
    .then(user => res.status(200).send({ success: true, settings: user.settings }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.updateSettings = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, { $set: { settings: req.body } }, { safe: true, upsert: true, new: true })
    .then((result) => res.status(202).json({
      success: true,
      message: res.__('success.update'),
      user: result
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.findAllNotifications = (req, res) => {
  UserModel.findById(req.params.id)
    .then(user => {
      // Sort notifications by date desc, before sending on UI.
      user.notifications.sort((a, b) => new Date(b.date) - new Date(a.date))

      res.status(200).send({ success: true, count: user.notifications.length, notifications: user.notifications })
    })
    .catch((err) => errorHandler.handle(err, res))
}

exports.findNotificationById = (req, res) => {
  UserModel.findOne(
    { _id: req.params.id, notifications: { $elemMatch: { _id: req.params.notificationId } } })
    .then((foundUser) => {
      let index = foundUser.notifications.findIndex((not) => String(not._id) === req.params.notificationId)
      res.status(202).json({
        success: true,
        notification: foundUser.notifications[index]
      })
    })
    .catch(err => errorHandler.handle(err, res))
}

exports.updateNotification = (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.id, notifications: { $elemMatch: { _id: req.params.notificationId } } },
    { $set: restUtil.bindUpdateFields('notifications', req.body) },
    { new: true })
    .then((updatedUser) => {
      // Sort notifications by date desc, before sending on UI.
      updatedUser.notifications.sort((a, b) => new Date(b.date) - new Date(a.date))

      res.status(202).json({
        success: true,
        message: res.__('success.update'),
        notifications: updatedUser.notifications
      })
    })
    .catch(err => errorHandler.handle(err, res))
}

exports.deleteNotifications = (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { notifications: { _id: { $in: req.params.notificationIds.split(',') } } } },
    { new: true })
    .then((updatedUser) => {
      // Sort notifications by date desc, before sending on UI.
      updatedUser.notifications.sort((a, b) => new Date(b.date) - new Date(a.date))

      res.status(200).json({
        success: true,
        message: res.__('success.delete'),
        notifications: updatedUser.notifications
      })
    })
    .catch(err => errorHandler.handle(err, res))
}
