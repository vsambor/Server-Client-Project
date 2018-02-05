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
