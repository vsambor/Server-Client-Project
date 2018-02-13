import axios from 'axios'

export default {
  /**
   * Gets all enumererations.
   */
  getAll() {
    return axios.get(`http://localhost:8081/api/enums`)
  },

  /**
   * Gets one enumereration by key.
   *
   * @param {Object} key - enumation key.
   */
  getById(key) {
    return axios.get(`http://localhost:8081/api/enums/${key}`)
  }
}
