import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.role + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.role + '/' + id)
}

const insert = (data) => {
  return axios.post(api.role, data)
}

const update = (id, data) => {
  return axios.put(api.role + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.role + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del
}
