import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.order + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.order + '/' + id)
}

const insert = (data) => {
  return axios.post(api.order, data)
}

const update = (id, data) => {
  return axios.put(api.order + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.order + '/' + id)
}

const pay = (orderId, data) => {
  return axios.post(`${api.order}/${orderId}/payment`, data)
}

export {
  get,
  detail,
  insert,
  update,
  del,
  pay
}
