import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const get = (params) => {
  return axios.get(api.holiday + serializeQueryParams(params))
}

const save = (data) => {
  return axios.post(api.holiday, data)
}

export {
  get,
  save
}
