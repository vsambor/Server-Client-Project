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
  },

  /**
   * Updates accident.
   */
  set(id, data) {
    return axios.put(`http://localhost:8081/api/accidents/${id}`, data)
  },

  /**
   * Add comment to the accident.
   *
   * @param {Number} id - accident id.
   * @param {Object} data - new comment object.
   * @return {Promise} - comment data on success.
   */
  addComment(id, data) {
    return axios.post(`http://localhost:8081/api/accidents/${id}/comments`, data)
  },

  /**
   * Gets all comments to the accident.
   *
   * @param {Number} id - accident id.
   * @return {Promise} - comment data on success.
   */
  getComments(id) {
    return axios.get(`http://localhost:8081/api/accidents/${id}/comments`)
  },

  /**
   * Deletes the comment to the accident.
   *
   * @param {Number} id - accident id.
   * @param {Number} commentId - comment id.
   * @return {Promise} - comment data on success.
   */
  deleteComment(id, commentId) {
    return axios.delete(`http://localhost:8081/api/accidents/${id}/comments/${commentId}`)
  },

  /**
   * Updates the comment accident.
   */
  setComment(id, commentId, data) {
    return axios.put(`http://localhost:8081/api/accidents/${id}/comments/${commentId}`, data)
  },

  /**
   * Updates vote accident.
   */
  setVote(id, data) {
    return axios.put(`http://localhost:8081/api/accidents/${id}/vote`, data)
  }
}
