import {
  del as deletePermission,
  detail as getPermission,
  get as getPermissions,
  insert as insertPermission,
  update as updatePermission
} from '@/api/permission'

const state = () => ({
  permissions: [],
  totalPermissions: 0,
  permission: {}
})

const getters = {
  permissions (state) {
    return state.permissions || []
  },
  totalPermissions (state) {
    return state.totalPermissions || 0
  },
  permission (state) {
    return state.permission || {}
  }
}

const mutations = {
  setPermissions (state, value) {
    state.permissions = [...value]
  },
  setTotalPermissions (state, value) {
    state.totalPermissions = value
  },
  setPermission (state, value) {
    state.permission = { ...value }
  }
}

const actions = {
  getPermissions ({ commit }, payload) {
    return getPermissions(payload)
      .then(res => {
        commit('setPermissions', res.data.permissions)
        commit('setTotalPermissions', res.data.total)
        return res
      })
  },
  getPermission ({ commit }, id) {
    return getPermission(id)
      .then(res => {
        commit('setPermission', res.data)
        return res
      })
  },
  insertPermission ({ commit }, payload) {
    return insertPermission(payload)
  },
  updatePermission ({ commit }, id, payload) {
    return updatePermission(id, payload)
  },
  deletePermission ({ commit }, id) {
    return deletePermission(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
