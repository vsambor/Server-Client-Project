const mongoose = require('mongoose')
const Enums = require('../enum/model')
const i18n = require('../../../config/i18n')

const schema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: i18n.__('error.validation.email.required'),
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, i18n.__('error.validation.email.invalid')]
  },
  password: {
    type: String,
    required: i18n.__('error.validation.password.required'),

    // This doesn't work properly; the check is done on save and because of bcrypt the length becames bigger. (we'll find a solution)
    minlength: [5, i18n.__('error.validation.password.min_length', 5)]
  },
  role: {
    type: String,
    enum: {
      values: Enums.role,
      message: i18n.__('error.validation.fieldType.enum', Enums.role.join(', '))
    },
    default: Enums.role[2]
  },
  profile: {
    firstName: {
      type: String,
      match: [/(.+)/, i18n.__('error.validation.fieldType.string')]
    },
    lastName: { type: String },
    age: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: i18n.__('error.validation.fieldType.number')
      },
      min: 0
    },
    nationality: { type: String },
    picture: { type: String }
  },
  position: {
    // Geolocation type: i.e. Point, Polygon, LineString, MultiPoint etc.
    type: { type: String },

    // Note: it is in LON, LAT order.
    coordinates: [Number]
  },
  vehicles: [{
    id: { type: mongoose.Schema.ObjectId },
    type: {
      type: String,
      enum: {
        values: Object.keys(Enums.vehicle),
        message: i18n.__('error.validation.fieldType.enum', Object.keys(Enums.vehicle).join(', '))
      }
    },
    model: { type: String },
    registrationNumber: { type: String },
    color: { type: String }
  }],
  settings: {
    showNotification: { type: Boolean, default: true },

    // Web app theme.
    appTheme: { type: String, default: 'secondary' },

    // Disabled/enabled geolocation
    geo: { type: Boolean, default: true },

    // Distance in km.
    alertProximity: { type: Number, default: 10 },

    // Map zoom in km.
    mapZoom: { type: Number, default: 15 }
  },
  token: { type: String },
  isActive: { type: Boolean, default: false }
}, { timestamps: {} }) // The timestamps adds 2 fields; createdAt and updatedAt in the database.

// Creates an index for position, which allows the geometrical querie like: inclusion, intersection and proximity.
schema.index({ 'position': '2dsphere' })

module.exports = mongoose.model('user', schema)
