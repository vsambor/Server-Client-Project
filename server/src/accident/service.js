const AccidentModel = require('./model')
const errorHandler = require('../util/errorUtil')

exports.add = (req, res) => {
  let newAccident = new AccidentModel(req.body)

  // Updates all comments dates, since only the <accident> model has timestamp by default.
  newAccident.comments.forEach(comment => {
    comment.createdAt = comment.updatedAt = Date.now()
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
  AccidentModel.find({})
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
