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
  },

  /**
   * Gets all users.
   */
  getAllUsers() {
    return axios.get(`http://localhost:8081/api/users`)
  },

  /**
   * Add vehicle to the database.
   *
   * @param {Number} id - user id.
   * @param {Object} data - vehicle data.
   */
  addVehicle(id, data) {
    return axios.post(`http://localhost:8081/api/users/${id}/vehicles`, data)
  },

  /**
   * Gets the user vehicles.
   *
   * @param {Number} id - user id.
   */
  getVehicles(id) {
    return axios.get(`http://localhost:8081/api/users/${id}/vehicles`)
  },

  /**
   * Deletes the user vehicle.
   */
  deleteVehicle(id, vehicleId) {
    return axios.delete(`http://localhost:8081/api/users/${id}/vehicles/${vehicleId}`)
  },

  /**
   * Updates the user vehicle.
   */
  setVehicle(id, vehicleId, data) {
    return axios.put(`http://localhost:8081/api/users/${id}/vehicles/${vehicleId}`, data)
  }
}
