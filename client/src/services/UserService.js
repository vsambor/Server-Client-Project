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
  getSettings(id) {
    return axios.get(`http://localhost:8081/api/users/${id}/settings`)
  },
  setSettings(id, data) {
    return axios.put(`http://localhost:8081/api/users/${id}/settings`, data)
  }
}
