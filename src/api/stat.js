import api from './config'
import { serializeQueryParams } from '@/utils/query'
import axios from './index'

const queue = (params) => {
  return axios.get(api.stat + serializeQueryParams(params))
}

const dashboard = () => {
  return axios.get(`/api/dashboard/statistic`)
}

export {
  queue,
  dashboard
}
