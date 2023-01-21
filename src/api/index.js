import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { pages } from '@/config'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  transformResponse: [data => JSON.parse(data).result],
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${store.getters['auth/token']}`
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.code === 401) {
        store.commit('auth/setLogout')
      } else if (error.response.code === 403) {
        router.replace({ name: pages.forbidden.name })
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
