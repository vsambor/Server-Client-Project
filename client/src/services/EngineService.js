import axios from 'axios'

export default {

  /**
   * Gets results from the semantic search engine.
   *
   * @param {Object} query - a semantic query; contains the subject and conditions.
   */
  search: (query) => axios.post('http://localhost:8081/api/semantic/engine/search', query)
}
