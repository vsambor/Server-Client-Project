const TeamModel = require('./model')
const MemberModel = require('../member/model')

exports.add = (req, res) => {
  let newTeam = new TeamModel({
    name: req.body.name,
    result: req.body.result
  })

  newTeam.save(newTeam)
    .then(() => res.json(201, newTeam))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.findAll = (req, res) => {
  TeamModel.find({})
    .then(result => res.status(200).send(result))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.findById = (req, res) => {
  TeamModel.findById(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send(result)
      } else {
        res.status(404).send('Not found')
      }
    })
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.update = (req, res) => {
  TeamModel.findOneAndUpdate(req.params.id, req.body, { upsert: true, new: true })
    .then(result => res.status(202).send(result))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.delete = (req, res) => {
  TeamModel.findByIdAndRemove(req.params.id)
    .then(result => res.send({ message: 'removed' }))
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.addMember = (req, res) => {
  MemberModel.findById(req.params.memberId)
    .then(result => {
      TeamModel.findByIdAndUpdate(req.params.teamId, { $push: { members: result } }, { safe: true, upsert: true })
        .then(() => res.json(201, result))
        .catch((err) => res.status(400).send('Error: ' + err))
    })
    .catch((err) => res.status(400).send('Error: ' + err))
}

exports.deleteMember = (req, res) => {
  TeamModel.update(req.params.teamId, { $pull: { members: { _id: req.params.teamId } } })
    .then(result => res.send({ message: 'removed' }))
    .catch((err) => res.status(400).send('Error: ' + err))
}
