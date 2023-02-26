const basePath = ''

export default {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password'
  },
  user: '/api/user',
  role: '/api/role',
  permission: '/api/permission',

  movie: '/api/movie',
  product: '/api/product',
  theater: '/api/theater',
  tax: '/api/tax',
  paymentType: '/api/payment/type',

  studio: '/api/studio',
  screening: '/api/screening',
  order: '/api/order',
  pricing: '/api/pricing',

  log: 'api/log',
  setting: '/api/setting',
  stat: '/api/statistic',

  getApiPath: function (apiPath) {
    return basePath + apiPath
  }
}
