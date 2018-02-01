/**
 * This utility handles the error validation and localization for services.
 */
exports.handle = (err, res) => {
  switch (err.name) {
    case 'MongoError':
      // This error codes represent entity duplications in the database. (We should handle only interesting codes)
      // https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
      if (err.code === 11000) {
        return res.status(400).send({
          success: false,
          error: res.__('error.type.mongo'),
          message: res.__('error.mongo.duplicated') + extractDuplicateField(err.message)
        })
      } else {
        return defaultError(res, err)
      }
    case 'ValidationError':
      // TO DO - Even better handler of messages; right now all messages are combined in same message.
      return res.status(400).send({
        success: false,
        error: res.__('error.type.validation'),
        message: err.message
      })
    default:
      // Takes care of unhadled errors.
      // Note: we should log the errors before puting it in production.
      return defaultError(res, err)
  }
}

/**
 * Returns the 500 generic error.
 *
 * @param {Object} res - the http response object.
 * @param {Object} err - the error object.
 * @return {Object} - error object.
 */
function defaultError(res, err) {
  return res.status(500).send({
    success: false,
    error: res.__('error.type.generic'),
    message: res.__('error.internal'),
    // Only dev mode.
    dev_error: err
  })
}

/**
 * Returs the duplicated field from mongo error.
 * Yes, it is kind of little hack, but unfortunately there is no simple way for doing this at the moment.
 *
 * @param {String} errorMessage - mongo db error
 * @return {String} - the field which cause the error.
 */
function extractDuplicateField(errorMessage) {
  const regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i
  const match = errorMessage.match(regex)
  return match[1] || match[2]
}
