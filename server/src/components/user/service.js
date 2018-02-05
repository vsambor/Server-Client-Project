const UserModel = require('./model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../../common/util/errorUtil')
const mailer = require('../../common/service/mailer')
const crypto = require('crypto')
const restUtil = require('../../common/util/restUtil')

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
