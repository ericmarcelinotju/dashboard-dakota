import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.screening + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.screening + '/' + id)
}

const insert = (data) => {
  return axios.post(api.screening, data)
}

const update = (id, data) => {
  return axios.put(api.screening + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.screening + '/' + id)
}

const save = (data) => {
  return axios.post(`${api.screening}/save`, data)
}

const ticket = (screeningId) => {
  return axios.get(`${api.ticket}?screeningId=${screeningId}`)
}

export {
  get,
  detail,
  insert,
  update,
  del,
  save,
  ticket
}
