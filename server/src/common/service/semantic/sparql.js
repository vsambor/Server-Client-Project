const SparqlClient = require('sparql-client')
const util = require('util')
const endpoint = require('../../../../config/config').development.sparql.endpoint

exports.queryRDF = (query, cb) => {
  return new Promise((resolve, reject) => {
    // Get the leaderName(s) of the given citys if you do not bind any city, it returns 10 random leaderNames
    let client = new SparqlClient(endpoint)

    console.log('Query to ' + endpoint)
    console.log('Query: ' + query)

    client.query(query).execute(function(error) {
      if (error) {
        reject(error)
      } else {
        resolve(
          util.inspect(arguments, null, 20, true)
            .replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f')
            .replace(/'/g, '"').replace(/\s(\w+):/g, '"$1":')
        )
      }
    })
  })
}
