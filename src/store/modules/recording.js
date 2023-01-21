import {
  download as downloadRecording,
  getTrunk as getTrunks
} from '@/api/recording'

const state = () => ({
  recordingFiles: {},
  trunks: {}
})

const getters = {
  recordingFile (state) {
    return (id) => state.recordingFiles[id]
  },
  trunks (state) {
    return (branchID) => state.trunks[branchID] || []
  }
}

const mutations = {
  setRecordingFile (state, { id, value }) {
    state.recordingFiles[id] = value
  },
  setTrunks (state, { id, value }) {
    state.trunks[id] = value
  }
}

const actions = {
  async downloadRecording ({ commit, getters }, id) {
    if (getters.recordingFile(id)) {
      return getters.recordingFile(id)
    }
    const res = await downloadRecording(id)
    const blob = new Blob([res.data])
    commit('setRecordingFile', {
      id,
      value: blob
    })
    return blob
  },
  getTrunks ({ commit }, branchID) {
    return getTrunks(branchID)
      .then(res => {
        commit('setTrunks', {
          id: branchID,
          value: res.data
        })
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
