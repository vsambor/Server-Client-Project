import axios from 'axios'

export default {

  /**
   * Registers the user.
   *
   * @param {Object} data - registration data.
   */
  register(data) {
    return axios.post('http://localhost:8081/api/user', data)
  }
}
