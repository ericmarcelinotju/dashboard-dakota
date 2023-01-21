import { pages } from '@/config'
import { guardAuth, guardGuest } from '@/utils/auth'

/** default import **/
import DefaultContainer from '@/components/layout/container/index.vue'

import userRoute from '@/pages/user/route.js'
import roleRoute from '@/pages/role/route.js'
import permissionRoute from '@/pages/permission/route.js'

import logRoute from '@/pages/log/route.js'

import branchRoute from '@/pages/branch/route.js'
import extensionRoute from '@/pages/extension/route.js'
import recordingRoute from '@/pages/recording/route.js'

/** dynamic & async import **/
const Login = () => import(/* webpackChunkName: 'p-auth-login' */ '@/pages/auth/Login/index.vue')
const Logout = () => import(/* webpackChunkName: 'p-auth-logout' */ '@/pages/auth/Logout/index.vue')
const ForgotPassword = () => import(/* webpackChunkName: 'p-forgot-password' */ '@/pages/auth/ForgotPassword/index.vue')
const Dashboard = () => import(/* webpackChunkName: 'p-dashboard */ '@/pages/dashboard/index.vue')

const Setting = () => import(/* webpackChunkName: 'p-setting' */ '@/pages/setting/index.vue')
const Statistic = () => import(/* webpackChunkName: 'p-setting' */ '@/pages/statistic/Statistic.vue')

const Forbidden = () => import(/* webpackChunkName: 'c-forbidden */ '@/components/Forbidden.vue')
const NotFound = () => import(/* webpackChunkName: 'c-not-found */ '@/components/NotFound.vue')
const RouterView = () => import(/* webpackChunkName: 'c-router-view */ '@/components/RouterView.vue')

const dashboardRoutes = {
  path: pages.dashboard.url,
  name: pages.dashboard.name,
  component: Dashboard,
  meta: {
    auth: true,
    title: pages.getAppTitle(pages.dashboard.name)
  }
}

const userRoutes = {
  path: pages.user.url,
  component: RouterView,
  children: userRoute
}

const roleRoutes = {
  path: pages.role.url,
  component: RouterView,
  children: roleRoute
}

const permissionRoutes = {
  path: pages.permission.url,
  component: RouterView,
  children: permissionRoute
}

const logRoutes = {
  path: pages.log.url,
  component: RouterView,
  children: logRoute
}

const settingRoutes = {
  path: pages.setting.url,
  name: pages.setting.name,
  component: Setting,
  meta: {
    auth: true,
    title: pages.getAppTitle(pages.setting.name)
  }
}

const statisticRoutes = {
  path: pages.statistic.url,
  name: pages.statistic.name,
  component: Statistic,
  meta: {
    auth: true,
    title: pages.getAppTitle(pages.statistic.name)
  }
}

const branchRoutes = {
  path: pages.branch.url,
  component: RouterView,
  children: branchRoute
}

const extensionRoutes = {
  path: pages.extension.url,
  component: RouterView,
  children: extensionRoute
}

const recordingRoutes = {
  path: pages.recording.url,
  component: RouterView,
  children: recordingRoute
}

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  // Pages
  {
    path: pages.base.url,
    name: pages.base.name,
    component: DefaultContainer,
    redirect: pages.dashboard.url,
    children: [
      dashboardRoutes,

      userRoutes,
      roleRoutes,
      permissionRoutes,

      logRoutes,
      settingRoutes,
      statisticRoutes,

      branchRoutes,
      extensionRoutes,
      recordingRoutes
    ],
    beforeEnter: guardAuth
  },
  {
    path: pages.auth.login.url,
    name: pages.auth.login.name,
    component: Login,
    meta: {
      title: pages.getAppTitle(pages.auth.login.name)
    },
    beforeEnter: guardGuest
  },
  {
    path: pages.auth.logout.url,
    name: pages.auth.logout.name,
    component: Logout
  },
  {
    path: pages.forgotPassword.url,
    name: pages.forgotPassword.name,
    component: ForgotPassword,
    meta: {
      title: pages.getAppTitle(pages.forgotPassword.name)
    },
    beforeEnter: guardGuest
  },
  {
    path: pages.forbidden.url,
    name: pages.forbidden.name,
    component: Forbidden,
    meta: {
      title: pages.getAppTitle(pages.forbidden.name)
    }
  },
  {
    path: pages.notFound.url,
    name: pages.notFound.name,
    component: NotFound,
    meta: {
      title: pages.getAppTitle(pages.notFound.name)
    }
  }
]
