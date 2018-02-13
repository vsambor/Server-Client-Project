const UserModel = require('./model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../../common/util/errorUtil')
const mailer = require('../../common/service/mailer')
const crypto = require('crypto')
const restUtil = require('../../common/util/restUtil')

const socketSender = require('../../common/service/socket/sender')

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

      // TRY TO SEND A NOTIFICATION HERE!   TO BE REMOVED
      // MESSAGES SHOULD BE LOCALIZED IN LANG.
      socketSender.sendNotification(req.app.get('socketio'), { id: 1, title: 'Users', message: 'Users loaded', date: Date.now() })

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
    .then((result) => res.status(201).json({
      success: true,
      message: res.__('success.add'),
      user: result
    }))
    .catch(err => errorHandler.handle(err, res))
}
