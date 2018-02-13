/**
 * Uses mongoose find method with more options like:
 *  - filter
 *  - sort
 *  - limit
 *
 * @param {Object} model - mongoose model which needs to be queried.
 * @param {Object} query - the http request url query params.
 * @return {Promise} - the promise of mongoose find method.
 */
exports.findAllWithOptions = (model, query) => {
  const filter = (query.filter && JSON.parse(query.filter)) || {}
  const sort = (query.sort && JSON.parse(query.sort)) || {}
  const limit = (query.limit && Number(query.limit)) || null

  return model.find(filter).sort(sort).limit(limit)
}

/**
 * Creates an object which is used to update specific fields with <$set> mongo function.
 *
 * Used for updating only the provided fields, and not touching the others.
 * For example:
 *  prefix: 'notification'
 *  obj = {"title": "test", "isRead": true }
 *  returns: { "notification.$.title": "test", "notification.$.isRead":true }
 *
 * @param {String} prefix - the field which represents the array.
 * @param {Object} obj - provided object for with fields for update.
 * @return {Object} - an object with prefixed keys; i.e. { "prefix.$.prop1": "a", "prefix.$.prop2": "b" }
 */
exports.bindUpdateFields = (prefix, obj) => {
  let keyValue = {}
  Object.keys(obj).forEach((el) => (keyValue[prefix + '.$.' + el] = obj[el]))

  return keyValue
}
