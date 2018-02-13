const sparql = require('../../common/service/semantic/sparql')

exports.countAllSeverities = (req, res) => {
  let dto = {}

  countAccidents(0.4, 10).then((res1) => {
    dto.minor = res1
    countAccidents(10, 23).then((res2) => {
      dto.moderate = res2
      countAccidents(23, 99).then((res3) => {
        dto.serious = res3
        countAccidents(99).then((res4) => {
          dto.extremlySerious = res4
          res.status(200).send(dto)
        })
      })
    })
  })
}

/**
 * Countes accidents by interval terminal spqrql query.
 * For the countExtremlySeriousAccidents we do not have to use two intervals.
 *
 * @param {Number} interv1 - left interval terminal of sparql query
 * @param {Number} interv2 - right interval terminal of sparql query
 */
function countAccidents(interv1, interv2) {
  return new Promise((resolve, reject) => {
    sparql.queryRDF(`SELECT count(*)
      WHERE {
        ?subject <http://xmlns.com/foaf/0.1/hasIndiceDeGravite> ?y
        FILTER(?y >= ${interv1}` + (interv2 ? `&& ?y < ${interv2})}` : ')}')
    )
      .then((result) => resolve(JSON.parse(result)['1'].results.bindings['0']['.1'].value))
      .catch((err) => reject(err))
  })
}
