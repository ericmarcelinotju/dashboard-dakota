import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.theater + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.theater + '/' + id)
}

const insert = (data) => {
  return axios.post(api.theater, data)
}

const update = (id, data) => {
  return axios.put(api.theater + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.theater + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del,
}
