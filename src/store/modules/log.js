import {
  get as getLogs,
  detail as getLog
} from '@/api/log'

const state = () => ({
  logs: [],
  log: {}
})

const getters = {
  logs (state) {
    return state.logs || []
  },
  log (state) {
    return state.log || {}
  }
}

const mutations = {
  setLogs (state, value) {
    state.logs = [...value]
  },
  setLog (state, value) {
    state.log = { ...value }
  }
}

const actions = {
  getLogs ({ commit }, payload) {
    return getLogs(payload)
      .then(res => {
        commit('setLogs', res.data.logs)
        return res
      })
  },
  getLog ({ commit }, id) {
    return getLog(id)
      .then(res => {
        commit('setLog', res.data)
        return res
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
