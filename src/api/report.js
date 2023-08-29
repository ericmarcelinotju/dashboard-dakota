import axios from './index'
import api from './config'
import { serializeQueryParams } from '@/utils/query'

const getOrder = (payload) => {
  return axios.get(`${api.report}/order${serializeQueryParams(payload)}`)
}

const downloadOrder = (payload) => {
  return axios.post(`${api.report}/order`, payload, {
    responseType: 'blob',
    transformResponse: [],
    timeout: 0
  })
}

export {
  getOrder,
  downloadOrder
}
