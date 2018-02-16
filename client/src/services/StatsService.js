import axios from 'axios'

export default {

  /**
   * Returns response from the api which contains count of accidents based on severity.
   */
  getAccidentStatsBySeverity() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/severity')
  },

  /**
   * Returns response from the api which contains count of accidents based on if is in collision or not.
   */
  getAccidentStatsByCollisionOrNot() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/collision')
  },

  /**
   * Returns response from the api which contains count of accidents based on if is in collision with vehicules or not.
   */
  getAccidentCollisionVehiculesOrNot() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/collivehicules')
  },

  /**
   * Returns response from the api which contains count of accidents based on kind of collided vehicles.
   */
  getAccidentCollisionVehiculesKind() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/collivehiculekind')
  }
}
