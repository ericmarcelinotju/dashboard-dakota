import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.pricing + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.pricing + '/' + id)
}

const insert = (data) => {
  return axios.post(api.pricing, data)
}

const update = (id, data) => {
  return axios.put(api.pricing + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.pricing + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del
}
