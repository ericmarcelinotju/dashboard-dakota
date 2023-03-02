import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.productCategory + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.productCategory + '/' + id)
}

const insert = (data) => {
  return axios.post(api.productCategory, data, { timeout: 0 })
}

const update = (id, data) => {
  return axios.put(api.productCategory + '/' + id, data, { timeout: 0 })
}

const del = (id) => {
  return axios.delete(api.productCategory + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del
}
