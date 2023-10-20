import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.user + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.user + '/' + id)
}

const insert = (data) => {
  return axios.post(api.user, data)
}

const update = (id, data) => {
  return axios.put(api.user + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.user + '/' + id)
}

const updateWork = (id, data) => {
  return axios.put(`${api.user}/${id}/work`, data)
}

const importDeposit = (payload) => {
  return axios.post(`${api.user}/import-deposit`, payload)
}

export {
  get,
  detail,
  insert,
  update,
  del,
  updateWork,
  importDeposit
}
