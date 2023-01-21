import { createLogger, createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import auth from './modules/auth'
import main from './main'
import config from './modules/config'
import user from './modules/user'
import role from './modules/role'
import permission from './modules/permission'

import branch from './modules/branch'
import recording from './modules/recording'

import fields from './modules/fields'
import log from './modules/log'
import setting from './modules/setting'

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  modules: ['auth', 'log', 'fields'],
  key: process.env.VITE_APP_SHORT_NAME
})

const modules = {
  auth,
  config,

  permission,
  role,
  user,

  branch,
  recording,

  fields,
  log,
  setting
}

export default createStore({
  state: main.state,
  mutations: main.mutations,
  actions: main.actions,
  getters: main.getters,
  modules,
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin]
})
