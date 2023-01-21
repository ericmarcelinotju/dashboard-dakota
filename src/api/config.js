const basePath = ''

export default {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password'
  },
  user: '/api/user',
  role: '/api/role',
  permission: '/api/permission',

  branch: '/api/branch',
  extension: '/api/extension',
  recording: '/api/recording',

  log: 'api/log',
  setting: '/api/setting',
  stat: '/api/statistic',

  getApiPath: function (apiPath) {
    return basePath + apiPath
  }
}
