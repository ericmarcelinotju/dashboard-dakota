import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.product + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.product + '/' + id)
}

const insert = (data) => {
  return axios.post(api.product, data, { timeout: 0 })
}

const update = (id, data) => {
  return axios.put(api.product + '/' + id, data, { timeout: 0 })
}

const del = (id) => {
  return axios.delete(api.product + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del,
}
