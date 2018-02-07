import axios from 'axios'

export default {

  /**
   * Registers the user.
   *
   * @param {Object} data - registration data.
   */
  register(data) {
    return axios.post('http://localhost:8081/api/users', data)
  },

  /**
   * Gets the user settings.
   *
   * @param {Number} id - user id.
   */
  getSettings(id) {
    return axios.get(`http://localhost:8081/api/users/${id}/settings`)
  },

  /**
   * Uploads the user settings.
   *
   * @param {Number} id - user id.
   * @param {Object} data - settings data.
   */
  setSettings(id, data) {
    return axios.put(`http://localhost:8081/api/users/${id}/settings`, data)
  }
}
