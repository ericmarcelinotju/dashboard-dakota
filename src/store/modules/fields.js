const defaultBranchFields = [
  {
    name: 'ID',
    value: 'id',
    hidden: true,
    editable: false
  },
  {
    name: 'Number',
    value: 'number'
  },
  {
    name: 'Name',
    value: 'name'
  },
  {
    name: 'Type',
    value: 'type'
  },
  {
    name: 'Status',
    value: 'status'
  },
  {
    name: 'Folder',
    value: 'folder',
    hidden: true
  },
  {
    name: 'Last Backup',
    value: 'last_backup'
  },
  {
    name: 'Web',
    value: 'web',
    width: 100,
    class: 'action'
  },
  {
    name: 'Sync',
    value: 'sync',
    width: 100,
    class: 'action'
  }
]

const defaultRecordingFields = [
  {
    name: 'ID',
    value: 'id',
    hidden: true,
    editable: false
  },
  {
    name: 'Branch',
    value: 'branch',
    hidden: true
  },
  {
    name: 'Time Start',
    value: 'start_time',
    sortable: true
  },
  {
    name: 'Time End',
    value: 'end_time',
    hidden: true
  },
  {
    name: 'Call From',
    value: 'call_from_number',
    sortable: true
  },
  {
    name: 'Call To',
    value: 'call_to_number',
    sortable: true
  },
  {
    name: 'Call Duration',
    value: 'call_duration',
    sortable: true
  },
  {
    name: 'Talk Duration',
    value: 'talk_duration',
    sortable: true
  },
  {
    name: 'Status',
    value: 'status'
  },
  {
    name: 'Source Trunk',
    value: 'src_trunk_name',
    sortable: true,
    hidden: true
  },
  {
    name: 'Destination Trunk',
    value: 'dst_trunk_name',
    sortable: true,
    hidden: true
  },
  {
    name: 'Communication Type',
    value: 'type',
    hidden: true
  },
  {
    name: 'PIN Code',
    value: 'pin_code',
    hidden: true
  },
  {
    name: 'DID',
    value: 'did_number',
    hidden: true
  },
  {
    name: 'Created By',
    value: 'created_by',
    hidden: true
  },
  {
    name: 'Is Legacy',
    value: 'is_legacy',
    hidden: true
  },
  {
    name: 'Error',
    value: 'error',
    hidden: true
  },
  {
    name: 'Recording Options',
    value: 'options',
    class: 'action',
    editable: false
  }
]

const defaultUserFields = [
  {
    name: 'ID',
    value: 'id',
    hidden: true,
    editable: false
  },
  {
    name: 'Username',
    value: 'username',
    sortable: true
  },
  {
    name: 'Email',
    value: 'email',
    sortable: true
  },
  {
    name: 'First Name',
    value: 'first_name',
    hidden: true
  },
  {
    name: 'Last Name',
    value: 'last_name',
    hidden: true
  },
  {
    name: 'Department',
    value: 'department',
    hidden: true
  },
  {
    name: 'Title',
    value: 'title',
    hidden: true
  },
  {
    name: 'Role',
    value: 'role',
    filterable: true,
    optionKey: 'role/roles'
  },
  {
    name: 'Branches',
    value: 'branches'
  },
  {
    name: 'Extensions',
    value: 'extensions'
  },
  {
    name: 'Last Login',
    value: 'last_login'
  }
]

const state = () => ({
  branchFields: defaultBranchFields,
  recordingFields: defaultRecordingFields,
  userFields: defaultUserFields
})

const getters = {
  branch (state, getters, rootState, rootGetters) {
    const hasSynchBranchPermission = rootGetters['auth/hasPermission']('SYNCHRONIZE_BRANCH', 'POST')
    if (!hasSynchBranchPermission) {
      return state.branchFields.filter(field => field.value !== 'sync') || []
    }
    return state.branchFields || []
  },
  recording (state, getters, rootState, rootGetters) {
    const hasDownloadRecordingPermission = rootGetters['auth/hasPermission']('DOWNLOAD_RECORDING', 'POST')
    const hasPlayRecordingPermission = rootGetters['auth/hasPermission']('PLAY_RECORDING', 'POST')
    if (!hasDownloadRecordingPermission && !hasPlayRecordingPermission) {
      return state.recordingFields.filter(field => field.value !== 'options') || []
    }
    return state.recordingFields || []
  },
  user (state) {
    return state.userFields || []
  }
}

const mutations = {
  setBranch (state, value) {
    state.branchFields = [...value]
  },
  setDefaultBranch (state) {
    state.branchFields = defaultBranchFields
  },
  setRecording (state, value) {
    state.recordingFields = [...value]
  },
  setDefaultRecording (state) {
    state.recordingFields = defaultRecordingFields
  },
  setUser (state, value) {
    state.userFields = [...value]
  },
  setDefaultUser (state) {
    state.userFields = defaultUserFields
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
