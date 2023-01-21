import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.permission + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.permission + '/' + id)
}

const insert = (data) => {
  return axios.post(api.permission, data)
}

const update = (id, data) => {
  return axios.put(api.permission + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.permission + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del
}
