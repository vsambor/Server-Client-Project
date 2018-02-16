const mongoose = require('mongoose')
const i18n = require('../../../config/i18n')

const schema = mongoose.Schema({
  position: {
    // Geolocation type: i.e. Point, Polygon, LineString, MultiPoint etc.
    type: { type: String },

    // Note: it should be LON, LAT --> exactly in this order, This is how mongo require in order to be able to query.
    coordinates: [Number]
  },
  date: { type: Date },
  severity: {
    type: Number
  },
  details: {
    dead: {
      type: Number
    },
    seriouslyInjure: {
      type: Number
    },
    lightlyInjurie: {
      type: Number
    },
    unhurt: {
      type: Number
    },
    light: {
      type: String
    },
    organism: {
      type: String
    },
    intersection: {
      type: String
    },
    weather: {
      type: String
    },
    crash: {
      type: String
    },
    road: {
      type: String
    },
    infrastructure: {
      type: String
    },
    nWay: {
      type: Number
    },
    specialWay: {
      type: String
    },
    heightDifference: {
      type: String
    },
    shapeRoad: {
      type: String
    },
    situationAccident: {
      type: String
    }
  },
  vote: {
    positive: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: i18n.__('error.validation.fieldType.number')
      },
      default: 0
    },
    negative: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: i18n.__('error.validation.fieldType.number')
      },
      default: 0
    }
  },
  comments: [{
    text: { type: String },
    userId: { type: String },
    picture: { type: String },
    author: { type: Object },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }]
}, { timestamps: {} })

// Creates an index for position, which allows the geometrical querie like: inclusion, intersection and proximity.
schema.index({ 'position': '2dsphere' })

module.exports = mongoose.model('accident', schema)
