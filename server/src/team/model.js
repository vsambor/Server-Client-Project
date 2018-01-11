const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: true
  },
  result: { type: String },
  members: { type: Array }
}, { timestamps: {} })

module.exports = mongoose.model('team', schema)
