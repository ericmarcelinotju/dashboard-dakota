import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.paymentType + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.paymentType + '/' + id)
}

const insert = (data) => {
  return axios.post(api.paymentType, data)
}

const update = (id, data) => {
  return axios.put(api.paymentType + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.paymentType + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del,
}
