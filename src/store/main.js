import { register } from '@/api/auth'

const state = () => ({
  isMobile: false,
  isUserOffline: false,
  appVersion: import.meta.env.VUE_APP_VERSION || '1.0.0',
  supportsWebP: false,
  visibleHeader: true,
  visibleFooter: true,
  whiteHeader: false
})

const mutations = {
  setIsMobile (state, value) {
    state.isMobile = value
  },
  setSupportsWebP (state, value) {
    state.supportsWebP = value
  },
  setUserOffline (state, value) {
    state.isUserOffline = value
  },
  setVisibleHeader (state, value) {
    state.visibleHeader = value
  },
  setVisibleFooter (state, value) {
    state.visibleFooter = value
  },
  setWhiteHeader (state, value) {
    state.whiteHeader = value
  }
}

const actions = {
  register ({ commit, dispatch }, { success, fail, data } = {}) {
    register(response => {
      success && success(response)
    }, fail, data)
  },
  showHeader ({ commit }) {
    commit('setVisibleHeader', true)
  },
  hideHeader ({ commit }) {
    commit('setVisibleHeader', false)
  },
  showFooter ({ commit }) {
    commit('setVisibleFooter', true)
  },
  hideFooter ({ commit }) {
    commit('setVisibleFooter', false)
  },
  setMobileDeviceStatus ({ commit }, data) {
    commit('setIsMobile', data)
  },
  setSupportsWebP ({ commit }, value) {
    commit('setSupportsWebP', value)
  },
  setUserOffline ({ commit }, value) {
    commit('setUserOffline', value)
  }
}

const getters = {
  appVersion (state) {
    return state.appVersion
  },
  currentUser (state) {
    return state.currentUser || {}
  },
  customerLogonId (state) {
    return (state.currentUser && state.currentUser.id) || 'guest'
  },
  isLoggedIn (state) {
    return !!state.currentUser.id
  },
  isMobile (state) {
    return state.isMobile
  },
  supportsWebP (state) {
    return state.supportsWebP
  },
  isUserOffline (state) {
    return state.isUserOffline
  },
  visibleHeader (state) {
    return state.visibleHeader
  },
  visibleFooter (state) {
    return state.visibleFooter
  },
  whiteHeader (state) {
    return state.whiteHeader
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
