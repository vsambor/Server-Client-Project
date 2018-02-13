/**
 * Checks if the node command line arguments contains the provided command.
 *
 * @param {String} cmd - the command string to be checked.
 * @return {Boolean} - true if command exists, false otherwise.
 */
exports.has = (cmd) => getIndex(cmd) > -1

/**
 * Returns the value of a command provided in the command line.
 * Since all commands names and values came as string, here it separates the value from name by '=' sign.
 *
 * @param {String} cmd - the command from which to take the value.
 * @return {String} - the command value.
 */
exports.get = (cmd) => {
  const index = getIndex(cmd)
  if (index > -1) {
    return process.argv[index].split('=')[1]
  }
}

/**
 * Checks if there is at least 1 populator command provided in node args.
 */
exports.hasAnyPopulator = () =>
  getIndex('POPULATE_ADMIN') > -1 || getIndex('POPULATE_USER') > -1 ||
  getIndex('POPULATE_ACCIDENTS') > -1 || getIndex('GENERATE_RDF') > -1

/**
 * Returns the index of <cmd> in node process arguments list.
 *
 * @param {String} cmd - the command string to find the index for.
 * @return {Number} - the found index or -1 if is not found.
 */
function getIndex(cmd) {
  return process.argv.findIndex((item) => item.indexOf(cmd) > -1)
}
