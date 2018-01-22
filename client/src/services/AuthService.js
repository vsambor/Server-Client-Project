import axios from 'axios'

export default {

  /**
   * Logs in the user.
   *
   * @param {Object} data - credentials data. i.e { email, password }
   */
  login: data => axios.post('http://localhost:8081/api/auth/login', data),

  /**
   * Logs out the user.
   */
  logout: () => axios.post('http://localhost:8081/api/auth/logout')
}
