import axios from 'axios'

export default {

  /**
   * return response from the api which contains count of accidents based on severity
  */
  getAccidentStatsBySeverity() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/severity')
  },

  /**
   * return response from the api which contains count of accidents based if collision or not
  */
  getAccidentStatsByCollisionOrNot() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/collision')
  },
  /**
   * return response from the api which contains count of accidents based if collision with vehicules or not
  */
  getAccidentCollisionVehiculesOrNot() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/collivehicules')
  },
  /**
  * return response from the api which contains count of accidents based on kind of vehicle collisions
 */
  getAccidentCollisionVehiculesKind() {
    return axios.get('http://localhost:8081/api/semantic/accidents/stats/count/collivehiculekind')
  }
}
