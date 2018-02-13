const enumsModel = require('./model')

exports.findAll = (req, res) => res.status(200).send({ success: true, enums: enumsModel })

exports.findByKey = (req, res) => res.status(200).send({ success: true, enum: enumsModel[req.params.key] })
