import axios from 'axios'
import store from '@/store'

const axiosInstance = axios.create({
  baseURL: process.env.VITE_APP_API_ADDRESS,
  timeout: 10000,
  transformResponse: [data => JSON.parse(data).result]
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${store.getters['auth/token']}`
    const theater = store.getters['auth/theater']
    if (theater) {
      config.headers['dakota-branch-id'] = theater.id
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.config.refresh !== false) {
      if (error.response.status === 401) {
        return store.dispatch('auth/refresh')
          .then(() => axios.request(error.config))
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
