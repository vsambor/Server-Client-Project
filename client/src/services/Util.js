/**
 * Holds all utils methods which are used around the application.
 */
export default {
  /**
   * Holds execution of a function until a timeout is expired.
   *
   * @param {Function} func - the function to be run.
   * @param {Number} wait - the waiting expiration in miliseconds.
   * @param {Boolean} immediate - if true then runs the function directly.
   */
  debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this
      var args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}
