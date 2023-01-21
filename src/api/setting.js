import api from './config'
import axios from './index'

const get = () => {
  return axios.get(api.setting)
}

const save = (name, value) => {
  return axios.post(api.setting, {
    name,
    value
  })
}

const testEmail = (email) => {
  return axios.post(`${api.setting}/test-email`, { email }, { timeout: 0 })
}

export {
  get,
  save,
  testEmail
}
