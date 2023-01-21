import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.branch + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.branch + '/' + id)
}

const insert = (data) => {
  return axios.post(api.branch, data)
}

const update = (id, data) => {
  return axios.put(api.branch + '/' + id, data)
}

const del = (id) => {
  return axios.delete(api.branch + '/' + id)
}

const sync = (id) => {
  // Set no timeout for this API
  return axios.post(api.branch + '/sync/' + id, null, {
    timeout: 0
  })
}

export {
  get,
  detail,
  insert,
  update,
  del,
  sync
}
