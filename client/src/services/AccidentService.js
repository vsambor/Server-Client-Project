import axios from 'axios'

export default {

  /**
   * Geta all accidents from the database.
   *
   * @return {Promise} - accidents data on success.
   */
  getAll() {
    return axios.get('http://localhost:8081/api/accidents')
  }
}
