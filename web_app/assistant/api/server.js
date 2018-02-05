import axios from 'axios'
import config from '../../config'

/**
 * Server bundle only
 * @param {*} cookie passed from express
 */
export function createAPI(cookie) {
  const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
      common: {
        cookie
      }
    },
    withCredentials: true
  })

  return api
}
