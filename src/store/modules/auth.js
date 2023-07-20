import {
  login,
  logout,
  refresh
} from '@/api/auth'
import router from '@/router'
import { pages } from '@/config'

const state = () => ({
  user: {},
  token: null,
  refreshToken: null,
  activeTheater: null
})

const getters = {
  user (state) {
    return state.user || {}
  },
  token (state) {
    return state.token
  },
  theater (state) {
    return state.activeTheater || (state.user.workIn ? state.user.workIn.theater : null)
  },
  isLoggedIn (state) {
    return state.token !== null
  },
  hasPermission (state) {
    return (module, method) => {
      // if (!state.user || !state.user.role) {
      //   return false
      // }
      // const found = state.user.role.permissions.find(item => {
      //   if (Array.isArray(method)) {
      //     return item.module === module && method.includes(item.method)
      //   }
      //   return item.module === module && item.method === method
      // })
      // return !!found
      return true
    }
  }
}

const mutations = {
  setLogin (state, value) {
    state.user = value.user
    state.token = value.accessToken
    state.refreshToken = value.refreshToken
  },
  setLogout (state) {
    state.user = {}
    state.token = null
    state.refreshToken = null
    state.activeTheater = null
    router.replace({ path: pages.auth.login.url })
  },
  setTheater (state, theater) {
    state.activeTheater = theater
  }
}

const actions = {
  login ({ commit }, data) {
    return login(data)
      .then((res) => {
        commit('setLogin', res.data)
        return res
      })
  },
  logout ({ commit }) {
    return logout()
      .finally(() => {
        commit('setLogout')
      })
  },
  refresh ({ state, commit }) {
    return refresh({ refreshToken: state.refreshToken })
      .then((res) => {
        commit('setLogin', res.data)
        return res
      })
      .catch(() => {
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
