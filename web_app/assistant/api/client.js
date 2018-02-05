import axios from 'axios'

import config from '../../config'

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true
})

export default api
