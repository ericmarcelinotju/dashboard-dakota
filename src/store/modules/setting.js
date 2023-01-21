import {
  get as getSettings,
  save as saveSetting
} from '@/api/setting'

const state = () => ({
  settings: {}
})

const getters = {
  settings (state) {
    return state.settings || {}
  }
}

const mutations = {
  setSettings (state, value) {
    state.settings = { ...value }
  }
}

const actions = {
  getSettings ({ commit }, payload) {
    return getSettings(payload)
      .then(res => {
        commit('setSettings', res.data.settings.reduce((acc, setting) => {
          acc[setting.name] = setting.value
          return acc
        }, {}))
        return res
      })
  },
  saveSettings ({ commit }, payload) {
    const promises = []
    for (const key in payload) {
      promises.push(saveSetting(key, payload[key] + ''))
    }
    return Promise.all(promises)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
