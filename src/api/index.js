import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { pages } from '@/config'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  transformResponse: [data => JSON.parse(data).data],
  withCredentials: true
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        store.commit('auth/setLogout')
      } else if (error.response.status === 403) {
        router.replace({ name: pages.forbidden.name })
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
