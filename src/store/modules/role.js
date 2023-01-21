import {
  del as deleteRole,
  detail as getRole,
  get as getRoles,
  insert as insertRole,
  update as updateRole
} from '@/api/role'

const state = () => ({
  roles: [],
  totalRoles: 0,
  role: {}
})

const getters = {
  roles (state) {
    return state.roles || []
  },
  totalRoles (state) {
    return state.totalRoles || 0
  },
  role (state) {
    return state.role || {}
  }
}

const mutations = {
  setRoles (state, value) {
    state.roles = [...value]
  },
  setTotalRoles (state, value) {
    state.totalRoles = value
  },
  setRole (state, value) {
    state.role = { ...value }
  }
}

const actions = {
  getRoles ({ commit }, payload) {
    return getRoles(payload)
      .then(res => {
        commit('setRoles', res.data.roles)
        commit('setTotalRoles', res.data.total)
        return res
      })
  },
  getRole ({ commit }, id) {
    return getRole(id)
      .then(res => {
        commit('setRole', res.data)
        return res
      })
  },
  insertRole ({ commit }, payload) {
    return insertRole(payload)
  },
  updateRole ({ commit }, id, payload) {
    return updateRole(id, payload)
  },
  deleteRole ({ commit }, id) {
    return deleteRole(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
