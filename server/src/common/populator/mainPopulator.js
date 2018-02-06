const argUtil = require('../util/argUtil')

/**
 * Calls all populators or script generators.
 *
 * Note: The arguments should be provided form the command line at server start time.
 */
exports.populate = () => {
  console.log('\n##### Database population #####\n')

  if (argUtil.has('POPULATE_ADMIN')) {
    require('./userPopulator').populateAdmin()
  }

  if (argUtil.has('POPULATE_USER')) {
    require('./userPopulator').populateUser()
  }

  if (argUtil.has('POPULATE_ACCIDENTS')) {
    require('../script/parser').populate()
  }

  if (argUtil.has('GENERATE_RDF')) {
    // TODO call the script which generates the RDF file.

  }
}
