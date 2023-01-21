import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.recording + serializeQueryParams(params))
}

const detail = (id) => {
  return axios.get(api.recording + '/' + id)
}

const insert = (data) => {
  return axios.post(api.recording, data, { timeout: 0 })
}

const update = (id, data) => {
  return axios.put(api.recording + '/' + id, data, { timeout: 0 })
}

const del = (id) => {
  return axios.delete(api.recording + '/' + id)
}

const getTrunk = (branchID) => {
  return axios.get(api.recording + '/trunk?branch_id=' + branchID)
}

const download = (id) => {
  // Set no timeout for this API
  return axios.post(api.recording + '/download/' + id, null, {
    responseType: 'blob',
    transformResponse: [],
    timeout: 0
  })
}

export {
  get,
  detail,
  insert,
  update,
  del,
  getTrunk,
  download
}
