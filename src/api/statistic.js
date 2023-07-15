import axios from './index'

const dashboard = () => {
  return axios.get('/api/statistic/dashboard')
}

const user = () => {
  return axios.get('/api/statistic/user')
}

export {
  dashboard,
  user
}
