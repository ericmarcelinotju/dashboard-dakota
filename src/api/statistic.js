import axios from './index'

const dashboard = () => {
  return axios.get('/api/statistic/dashboard')
}

const user = () => {
  return axios.get('/api/statistic/user')
}

const order = () => {
  return axios.get('/api/statistic/order')
}

export {
  dashboard,
  user,
  order
}
