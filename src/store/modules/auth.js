import {
  login,
  logout
} from '@/api/auth'
import router from '@/router'
import { pages } from '@/config'

const state = () => ({
  user: {},
  token: null
})

const getters = {
  user(state) {
    return state.user || {}
  },
  token(state) {
    return state.token
  },
  isLoggedIn(state) {
    return state.token !== null
  },
  hasPermission(state) {
    return (module, method) => {
      if (!state.user || !state.user.role) {
        return false
      }
      const found = state.user.role.permissions.find(item => {
        if (Array.isArray(method)) {
          return item.module === module && method.includes(item.method)
        }
        return item.module === module && item.method === method
      })
      return !!found
    }
  }
}

const mutations = {
  setLogin(state, value) {
    state.user = value.user
    state.token = value.token
  },
  setLogout(state) {
    state.user = {}
    state.token = null
    router.replace({ path: pages.auth.login.url })
  }
}

const actions = {
  login({ commit }, data) {
    return login(data)
      .then((res) => {
        commit('setLogin', res.data)
        return res
      })
  },
  logout({ commit }) {
    return logout()
      .finally(() => {
        commit('setLogout')
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
