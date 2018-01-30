const UserModel = require('./model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../util/errorUtil')

exports.add = (req, res) => {
  let newUser = new UserModel({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    role: req.body.role,
    profile: {
      firstName: req.body.profile.firstName,
      lastName: req.body.profile.lastName,
      age: req.body.profile.age,
      nationality: req.body.profile.nationality,
      picture: req.body.profile.picture
    },
    vehicle: {
      type: req.body.vehicle.type,
      model: req.body.vehicle.model,
      registrationNumber: req.body.vehicle.registrationNumber,
      color: req.body.vehicle.color
    },
    settings: {
      showNotification: req.body.settings.showNotification,
      alertProximity: req.body.settings.alertProximity
    },
    isActive: req.body.isActive
  })

  newUser.save(newUser)
    .then(() => res.json(201, {
      success: true,
      message: res.__('success.add'),
      user: newUser
    }))
    .catch(err => errorHandler.handle(err, res))
}

exports.findAll = (req, res) => {
  UserModel.find({})
    .then(result => res.status(200).send({
      success: true,
      count: result.length,
      users: result
    }))
    .catch((err) => errorHandler.handle(err, res))
}

exports.findById = (req, res) => {
  UserModel.findById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch((err) => errorHandler.handle(err, res))
}

exports.update = (req, res) => {
  UserModel.findOneAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then(result => res.status(202).send({
      success: true,
      message: res.__('success.update'),
      data: result
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
