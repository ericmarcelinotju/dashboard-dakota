import {
  del as deleteBranch,
  detail as getBranch,
  get as getBranches,
  insert as insertBranch,
  update as updateBranch
} from '@/api/branch'

const state = () => ({
  branches: [],
  totalBranches: 0,
  branch: {}
})

const getters = {
  branches (state) {
    return state.branches || []
  },
  totalBranches (state) {
    return state.totalBranches || 0
  },
  branch (state) {
    return state.branch || {}
  }
}

const mutations = {
  setBranches (state, value) {
    state.branches = [...value]
  },
  setBranchByIndex (state, { index, value }) {
    state.branches[index] = value
  },
  setTotalBranches (state, value) {
    state.totalBranches = value
  },
  setBranch (state, value) {
    state.branch = { ...value }
  }
}

const actions = {
  getBranches ({ commit }, payload) {
    return getBranches(payload)
      .then(res => {
        commit('setBranches', res.data.branches)
        commit('setTotalBranches', res.data.total)
        return res
      })
  },
  getBranch ({ commit }, id) {
    return getBranch(id)
      .then(res => {
        commit('setBranch', res.data)
        return res
      })
  },
  insertBranch ({ commit }, payload) {
    return insertBranch(payload)
  },
  updateBranch ({ commit }, id, payload) {
    return updateBranch(id, payload)
  },
  deleteBranch ({ commit }, id) {
    return deleteBranch(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
