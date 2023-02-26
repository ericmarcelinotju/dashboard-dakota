import api from './config'
import axios from './index'

const login = (data) => {
  return axios.post(api.auth.login, data)
}

const logout = () => {
  return axios.post(api.auth.logout)
}

const register = (data) => {
  return axios.post(api.auth.register, data)
}

const refresh = (data) => {
  return axios.post(api.auth.refresh, data)
}

const forgotPassword = (data) => {
  return axios.post(api.auth.forgotPassword, data, { timeout: 30000 })
}

const resetPassword = (data) => {
  return axios.post(api.auth.resetPassword, data)
}

export {
  login,
  logout,
  register,
  refresh,
  forgotPassword,
  resetPassword
}
