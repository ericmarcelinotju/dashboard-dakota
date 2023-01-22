import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.tax + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.tax + '/' + id)
}

const insert = (data) => {
  return axios.post(api.tax, data)
}

const update = (id, data) => {
  return axios.put(api.tax + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.tax + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del,
}
