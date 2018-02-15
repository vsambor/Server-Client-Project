const sparql = require('../../common/service/semantic/sparql')

/**
 * Return a json response that contains all accidents groups by severity
 * @param {*} req
 * @param {*} res
 */
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
 * Return json resposne that contains number of accidents grouped by collision or not
 * @param {*} req
 * @param {*} res
 */
exports.countWithAndWithoutCol = (req, res) => {
  let dto = {}
  countCollisionsByKind(8).then((res1) => {
    dto.withCollision = res1
    countCollisionsByKind(7).then((res2) => {
      dto.withoutCollision = res2
      res.status(200).send(dto)
    })
  })
}

/**
 * Return json response that contains number of accidents grouped by collision with vehicules or not
 * @param {*} req
 * @param {*} res
 */
exports.countWithColWithVehiAndWithout = (req, res) => {
  let dto = {}
  countCollisionsByKind(6).then((res1) => {
    dto.otherCollision = res1
    countCollisionsByKind(9).then((res2) => {
      dto.vehiculeCollision = res2
      res.status(200).send(dto)
    })
  })
}

/**
 * Return json response that contains number of accidents grouped by collision with vehicules,
 * two vehicules by side, by back, frontal....
 * @param {*} req
 * @param {*} res
 */
exports.countWithVehKinds = (req, res) => {
  let dto = {}
  countCollisionsByKind(4).then((res1) => {
    dto.threeOrMore = res1
    countCollisionsByKind(3).then((res2) => {
      dto.twoVehiculesByTheSide = res2
      countCollisionsByKind(2).then((res3) => {
        dto.twoVehiculesByTheBack = res3
        countCollisionsByKind(1).then((res3) => {
          dto.twoVehiculesFrontal = res3
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
        ?subject <http://www.webofdata.fr/prop#hasIndiceDeGravite> ?y
        FILTER(?y >= ${interv1}` + (interv2 ? `&& ?y < ${interv2})}` : ')}')
    )
      .then((result) => resolve(JSON.parse(result)['1'].results.bindings['0']['.1'].value))
      .catch((err) => reject(err))
  })
}

/**
 * Counts accidents by kind of collision
 *
 * @param {*} kind
 */
function countCollisionsByKind(kind) {
  return new Promise((resolve, reject) => {
    sparql.queryRDF(`SELECT count(*)
      WHERE {
        ?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.webofdata.fr/classes#collision${kind}> 
       }`
    )
      .then((result) => resolve(JSON.parse(result)['1'].results.bindings['0']['.1'].value))
      .catch((err) => reject(err))
  })
}
