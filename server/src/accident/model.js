const mongoose = require('mongoose')
const i18n = require('../../config/i18n')

const schema = mongoose.Schema({
  lat: {
    type: Number,
    required: i18n.__('error.validation.lat.required')
  },
  lng: {
    type: Number,
    required: i18n.__('error.validation.lng.required')
  },
  date: { type: Date },
  severity: {
    type: Number
  },
  vote: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: i18n.__('error.validation.fieldType.number')
    },
    default: 0
  },
  comments: [{
    text: { type: String },
    author: { type: Object },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }]
}, { timestamps: {} })

module.exports = mongoose.model('accident', schema)
