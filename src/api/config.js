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
  productCategory: '/api/product/category',
  theater: '/api/theater',
  holiday: '/api/holiday',
  tax: '/api/tax',
  payment: '/api/payment',
  paymentType: '/api/payment/type',

  studio: '/api/studio',
  screening: '/api/screening',
  ticket: '/api/ticket',
  order: '/api/order',
  pricing: '/api/pricing',

  log: 'api/log',
  setting: '/api/setting',
  stat: '/api/statistic',
  report: '/api/report',

  getApiPath: function (apiPath) {
    return basePath + apiPath
  }
}
