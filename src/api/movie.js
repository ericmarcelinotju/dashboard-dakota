import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.movie + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.movie + '/' + id)
}

const insert = (data) => {
  return axios.post(api.movie, data, { timeout: 0 })
}

const update = (id, data) => {
  return axios.put(api.movie + '/' + id, data, { timeout: 0 })
}

const del = (id) => {
  return axios.delete(api.movie + '/' + id)
}

export {
  get,
  detail,
  insert,
  update,
  del
}
