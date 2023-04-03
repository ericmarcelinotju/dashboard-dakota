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
  getAppTitle: (pageName) => `${pageName.toUpperCase()} | Dakota - CMS`,
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
  member: {
    name: 'member',
    url: '/member',
    create: {
      name: 'member' + constant.CREATE.name
    },
    edit: {
      name: 'member' + constant.EDIT.name
    }
  },
  staff: {
    name: 'staff',
    url: '/staff',
    create: {
      name: 'staff' + constant.CREATE.name
    },
    edit: {
      name: 'staff' + constant.EDIT.name
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
  movie: {
    name: 'movie',
    url: '/movie',
    create: {
      name: 'movie' + constant.CREATE.name
    },
    edit: {
      name: 'movie' + constant.EDIT.name
    }
  },
  product: {
    name: 'product',
    url: '/product',
    create: {
      name: 'product' + constant.CREATE.name
    },
    edit: {
      name: 'product' + constant.EDIT.name
    }
  },
  theater: {
    name: 'theater',
    url: '/theater',
    create: {
      name: 'theater' + constant.CREATE.name
    },
    edit: {
      name: 'theater' + constant.EDIT.name
    }
  },
  tax: {
    name: 'tax',
    url: '/tax',
    create: {
      name: 'tax' + constant.CREATE.name
    },
    edit: {
      name: 'tax' + constant.EDIT.name
    }
  },
  paymentType: {
    name: 'payment-type',
    url: '/payment-type',
    create: {
      name: 'payment-type' + constant.CREATE.name
    },
    edit: {
      name: 'payment-type' + constant.EDIT.name
    }
  },

  studio: {
    name: 'studio',
    url: '/studio',
    create: {
      name: 'studio' + constant.CREATE.name
    },
    edit: {
      name: 'studio' + constant.EDIT.name
    }
  },
  screening: {
    name: 'screening',
    url: '/screening',
    create: {
      name: 'screening' + constant.CREATE.name
    },
    edit: {
      name: 'screening' + constant.EDIT.name
    }
  },
  order: {
    name: 'order',
    url: '/order',
    detail: {
      name: 'order' + constant.DETAIL.name
    }
  },
  ticket: {
    name: 'ticket',
    url: '/ticket',
    detail: {
      name: 'ticket' + constant.DETAIL.name
    }
  },
  pricing: {
    name: 'pricing',
    url: '/pricing',
    create: {
      name: 'pricing' + constant.CREATE.name
    },
    edit: {
      name: 'pricing' + constant.EDIT.name
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
