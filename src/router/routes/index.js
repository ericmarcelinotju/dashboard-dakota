import { pages } from '@/config'
import { guardAuth, guardGuest } from '@/utils/auth'

/** default import **/
import DefaultContainer from '@/components/layout/container/index.vue'

// Users routes
import memberRoute from '@/pages/user/member/route.js'
import staffRoute from '@/pages/user/staff/route.js'

import roleRoute from '@/pages/role/route.js'

import logRoute from '@/pages/log/route.js'

import movieRoute from '@/pages/movie/route.js'
import productRoute from '@/pages/product/route.js'
import theaterRoute from '@/pages/theater/route.js'
import taxRoute from '@/pages/tax/route.js'
import paymentTypeRoute from '@/pages/paymentType/route.js'

import studioRoute from '@/pages/studio/route.js'
import screeningRoute from '@/pages/screening/route.js'
import orderRoute from '@/pages/order/route.js'
import pricingRoute from '@/pages/pricing/route.js'

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

const memberRoutes = {
  path: pages.member.url,
  component: RouterView,
  children: memberRoute
}

const staffRoutes = {
  path: pages.staff.url,
  component: RouterView,
  children: staffRoute
}

const roleRoutes = {
  path: pages.role.url,
  component: RouterView,
  children: roleRoute
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

const movieRoutes = {
  path: pages.movie.url,
  component: RouterView,
  children: movieRoute
}

const productRoutes = {
  path: pages.product.url,
  component: RouterView,
  children: productRoute
}

const theaterRoutes = {
  path: pages.theater.url,
  component: RouterView,
  children: theaterRoute
}

const taxRoutes = {
  path: pages.tax.url,
  component: RouterView,
  children: taxRoute
}

const paymentTypeRoutes = {
  path: pages.paymentType.url,
  component: RouterView,
  children: paymentTypeRoute
}

const studioRoutes = {
  path: pages.studio.url,
  component: RouterView,
  children: studioRoute
}

const screeningRoutes = {
  path: pages.screening.url,
  component: RouterView,
  children: screeningRoute
}

const orderRoutes = {
  path: pages.order.url,
  component: RouterView,
  children: orderRoute
}

const pricingRoutes = {
  path: pages.pricing.url,
  component: RouterView,
  children: pricingRoute
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

      memberRoutes,
      staffRoutes,
      roleRoutes,

      logRoutes,
      settingRoutes,
      statisticRoutes,

      movieRoutes,
      productRoutes,
      theaterRoutes,
      taxRoutes,
      paymentTypeRoutes,

      studioRoutes,
      screeningRoutes,
      orderRoutes,
      pricingRoutes
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
