const UserModel = require('./model')
const bcrypt = require('bcryptjs')

exports.add = (req, res) => {
  let newUser = new UserModel({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
    .then(() => res.json(201, newUser))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.findAll = (req, res) => {
  UserModel.find({})
    .then(result => res.status(200).send(result))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.findById = (req, res) => {
  UserModel.findById(req.params.id)
    .then(result => res.status(200).send(result))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.update = (req, res) => {
  UserModel.findOneAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then(result => res.status(202).send(result))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.delete = (req, res) => {
  UserModel.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).send({ message: 'removed' }))
    .catch((err) => res.status(400).send('Error: ' + err))
}
