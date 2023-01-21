const constant = {
  INDEX: {
    path: ''
  },
  CREATE: {
    path: 'create',
    name: ' create'
  },
  EDIT: {
    path: ':id/edit',
    name: ' edit'
  },
  DETAIL: {
    path: ':id/detail',
    name: ' detail'
  },
  IMPORT: {
    path: 'import',
    name: ' import'
  }
}

const pages = {
  getAppTitle: (pageName) => `${pageName.toUpperCase()} | Central Recording Management`,
  constant: {
    INDEX: {
      path: ''
    },
    CREATE: {
      path: 'create',
      appendName: ' create'
    },
    EDIT: {
      path: ':id/edit',
      appendName: ' edit'
    },
    DETAIL: {
      path: ':id/detail',
      appendName: ' detail'
    },
    IMPORT: {
      path: 'import',
      appendName: ' import'
    }
  },
  about: 'https://datis.co.id/ezybill',
  base: {
    name: 'base',
    url: '/'
  },
  dashboard: {
    name: 'dashboard',
    url: '/dashboard'
  },
  forgotPassword: {
    name: 'forgotPassword',
    url: '/forgot-password'
  },
  auth: {
    login: {
      name: 'login',
      url: '/auth/login'
    },
    register: {
      name: 'register',
      url: '/auth/register'
    },
    logout: {
      name: 'logout',
      url: '/auth/logout'
    }
  },
  notFound: {
    name: 'notFound',
    url: '/:path(.*)'
  },
  forbidden: {
    name: 'forbidden',
    url: '/forbidden'
  },
  permission: {
    name: 'permission',
    url: '/permission',
    create: {
      name: 'permission' + constant.CREATE.name
    },
    edit: {
      name: 'permission' + constant.EDIT.name
    }
  },
  role: {
    name: 'role',
    url: '/role',
    create: {
      name: 'role' + constant.CREATE.name
    },
    edit: {
      name: 'role' + constant.EDIT.name
    }
  },
  user: {
    name: 'user',
    url: '/user',
    create: {
      name: 'user' + constant.CREATE.name
    },
    edit: {
      name: 'user' + constant.EDIT.name
    }
  },
  log: {
    name: 'log',
    url: '/log',
    system: {
      name: 'system-log',
      url: '/system'
    },
    event: {
      name: 'event-log',
      url: '/event'
    }
  },
  setting: {
    name: 'setting',
    url: '/setting'
  },
  statistic: {
    name: 'statistic',
    url: '/statistic'
  },
  branch: {
    name: 'branch',
    url: '/branch',
    create: {
      name: 'branch' + constant.CREATE.name
    },
    edit: {
      name: 'branch' + constant.EDIT.name
    }
  },
  extension: {
    name: 'extension',
    url: '/extension',
    create: {
      name: 'extension' + constant.CREATE.name
    },
    edit: {
      name: 'extension' + constant.EDIT.name
    }
  },
  recording: {
    name: 'recording',
    url: '/recording',
    create: {
      name: 'recording' + constant.CREATE.name
    },
    edit: {
      name: 'recording' + constant.EDIT.name
    }
  }
}

const app = {
  ref: '?redirect=',

  itemPerPageOptions: [10, 25, 50, 100, 500],

  setting: {
    name: 'Setting'
  }
}

const errors = {
  userNotFound: 'Akun anda tidak ditemukan. Mohon hubungi Customer Service kami'
}

export { app, errors, pages }
