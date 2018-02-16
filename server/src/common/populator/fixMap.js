const fs = require('fs')
const path = require('path')

/**
 * Fix a parameter in a file. (TEMPORAR FIX)
 */
exports.fix = () => {
  console.log(`### START: Map Fixing`)
  let filePath = path.join(__dirname, '..', '..', '..', '..', 'node_modules', 'marker-clusterer-plus', 'src', 'markerclusterer.js')

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return console.log(err)
    }

    var result = data.replace(/opt_options.minimumClusterSize \|\| 2;/, 'opt_options.minimumClusterSize || 6;')
    fs.writeFile(filePath, result, 'utf8', function(err) {
      if (err) {
        return console.log(err)
      };
      console.log('END Map fixing')
    })
  })
}
