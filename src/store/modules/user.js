import {
  del as deleteUser,
  detail as getUser,
  get as getUsers,
  insert as insertUser,
  update as updateUser
} from '@/api/user'

const state = () => ({
  users: [],
  totalUsers: 0,
  user: {}
})

const getters = {
  users (state) {
    return state.users || []
  },
  totalUsers (state) {
    return state.totalUsers || 0
  },
  user (state) {
    return state.user || {}
  }
}

const mutations = {
  setUsers (state, value) {
    state.users = [...value]
  },
  setTotalUsers (state, value) {
    state.totalUsers = value
  },
  setUser (state, value) {
    state.user = { ...value }
  }
}

const actions = {
  getUsers ({ commit }, payload) {
    return getUsers(payload)
      .then(res => {
        commit('setUsers', res.data.users)
        commit('setTotalUsers', res.data.total)
        return res
      })
  },
  getUser ({ commit }, id) {
    return getUser(id)
      .then(res => {
        commit('setUser', res.data)
        return res
      })
  },
  insertUser ({ commit }, payload) {
    return insertUser(payload)
  },
  updateUser ({ commit }, id, payload) {
    return updateUser(id, payload)
  },
  deleteUser ({ commit }, id) {
    return deleteUser(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
