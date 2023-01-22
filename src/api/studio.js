import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.studio + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.studio + '/' + id)
}

const insert = (data) => {
  return axios.post(api.studio, data)
}

const update = (id, data) => {
  return axios.put(api.studio + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.studio + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del,
}
