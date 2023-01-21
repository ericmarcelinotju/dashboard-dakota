import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.log + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.log + '/' + id)
}

const insert = (data) => {
  return axios.post(api.log, data)
}

const del = (id) => {
  return axios.delete(api.log + '/' + id)
}

export {
  get,
  detail,
  insert,
  del
}
