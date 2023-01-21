import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.extension + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.extension + '/' + id)
}

const insert = (data) => {
  return axios.post(api.extension, data)
}

const update = (id, data) => {
  return axios.put(api.extension + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.extension + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del
}
