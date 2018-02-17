const sparql = require('../../common/service/semantic/sparql')

/**
 * Return a json response that contains all accidents groups by severity
 * @param {*} req
 * @param {*} res
 */
exports.searchAccidents = (req, res) => {
  search(req.body)
    .then((result) => {
      res.status(200).send(result)
    }).catch((err) => { console.log(err) })
}

function search(query) {
  return new Promise((resolve, reject) => {
    sparql.queryRDF(` SELECT ?${query.subject} 
    WHERE {
      ?${query.subject} <http://www.webofdata.fr/prop#${query.property}> ?${query.propertyValue}.
      FILTER(${query.conditions}) 
     } LIMIT 50`
    )
      .then((result) => {
        console.log(result)
        resolve(JSON.parse(result)['1'].results)
      })
      .catch((err) => reject(err))
  })
}
