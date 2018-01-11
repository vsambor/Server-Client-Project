const mongoose = require('mongoose')

const schema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { type: String, required: 'The password is required', minlength: [5, 'Password too short! (min 5 required)'] },
  firstName: { type: String },
  lastName: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: {} }) // The timestamps adds 2 fields; createdAt and updatedAt in the database.

module.exports = mongoose.model('user', schema)
