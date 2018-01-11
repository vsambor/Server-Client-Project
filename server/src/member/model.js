const mongoose = require('mongoose')

const schema = mongoose.Schema({
  teamId: { type: String },
  name: {
    type: String,
    required: 'Name is required',
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  rating: { type: Number, min: 0, max: 10 }
}, { timestamps: {} })

module.exports = mongoose.model('member', schema)
