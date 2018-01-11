const UserModel = require('./model')
const bcrypt = require('bcryptjs')

exports.add = (req, res) => {
  let newUser = new UserModel({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
