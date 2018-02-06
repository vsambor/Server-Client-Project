import axios from 'axios'
import store from '../store'

export default {

  /**
   * Get all accidents from the database.
   *
   * @return {Promise} - accidents data on success.
   */
  getAll() {
    return axios.get('http://localhost:8081/api/accidents')
  },

  /**
   * Gets the accidents in user's proximity.
   *
   * @param {Object} currentPosition - { lat, lng }
   * @return {Promise} - accidents results promise.
   */
  getAllInProximity(currentPosition, distance) {
    let filter = {
      position: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [currentPosition.lng, currentPosition.lat]
          },

          // Times 1000 because maxDistance is expressed in meters.
          $maxDistance: store.getters.currentUserSettings.alertProximity * 1000
        }
      }
    }

    return axios.get('http://localhost:8081/api/accidents?filter=' + JSON.stringify(filter))
  },

  /**
   * Add accident to the database.
   *
   * @param {Object} data - new accident object.
   * @return {Promise} - accidents data on success.
   */
  add(data) {
    return axios.post('http://localhost:8081/api/accidents', data)
  }
}
