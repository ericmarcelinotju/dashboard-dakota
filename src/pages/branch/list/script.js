import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { CogIcon, GlobeIcon, PlusIcon, RefreshIcon } from '@heroicons/vue/solid'
import { snakeToTitle } from '@/utils/string'
import {
  get as getBranches,
  del as deleteBranch,
  sync as syncBranch
} from '@/api/branch'

export default defineComponent({
  name: 'BranchList',
  components: {
    CogIcon,
    GlobeIcon,
    PlusIcon,
    RefreshIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage,
    DefaultTabs: components.DefaultTabs
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const {
      showSuccessNotification,
      showWarningNotification,
      showDangerNotification
    } = useDefaultForm('branch')

    // Table fields setting
    const copyFields = JSON.parse(JSON.stringify(store.getters['fields/branch']))
    const fields = reactive(copyFields)
    const visibleCheckboxRefs = ref([])
    const visibleFieldConfigModal = ref(false)
    const onConfirmFieldConfig = () => {
      for (const checkbox of visibleCheckboxRefs.value) {
        const field = fields.find((field) => field.value === checkbox.id)
        field.hidden = !checkbox.checked
      }
      store.commit('fields/setBranch', fields)
    }
    const setDefaultFields = () => {
      store.commit('fields/setDefaultBranch')
      Object.assign(fields, JSON.parse(JSON.stringify(store.getters['fields/branch'])))
    }

    const loading = ref(false)
    let stateParams = reactive({})
    const items = ref([])
    const itemsTotal = ref(0)

    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getBranches(params)
        .then(res => {
          items.value = res.data.branches
          itemsTotal.value = res.data.total
        })
        .finally(() => {
          loading.value = false
        })
    }

    const handleCreate = () => {
      router.push({ name: pages.branch.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.branch.edit.name, params: { id } })
    }

    const loadingSync = ref(false)
    const handleSync = (data) => {
      if (loadingSync.value) {
        return
      }
      loadingSync.value = true
      syncBranch(data.id)
        .then(() => {
          handleSearch(stateParams)
          showSuccessNotification('synchronized')
        })
        .catch(err => {
          if (err.response.status === 404) {
            showWarningNotification('synchronized', 'No new recording found')
            return
          }
          showDangerNotification('synchronized')
        })
        .finally(() => {
          loadingSync.value = false
        })
    }

    const loadingDelete = ref(false)
    const visibleDeleteConfirmationModal = ref(false)
    const deleteItem = ref({})
    const handleDelete = (data) => {
      visibleDeleteConfirmationModal.value = true
      deleteItem.value = data
    }
    const confirmDelete = () => {
      const { id } = deleteItem.value
      loadingDelete.value = true
      deleteBranch(id)
        .then(() => {
          handleSearch(stateParams)
          showSuccessNotification('deleted')
        })
        .catch(() => {
          showDangerNotification('deleted')
        })
        .finally(() => {
          loadingDelete.value = false
          visibleDeleteConfirmationModal.value = false
        })
    }

    const handleDetail = ({ index, item }) => {
      items.value[index].isDetailOpen = !item.isDetailOpen
    }

    const hasPermission = (method) => {
      return store.getters['auth/hasPermission']('PERMISSION', method)
    }

    onMounted(() => {
      handleSearch(stateParams)
    })

    return {
      fields,
      visibleFieldConfigModal,
      visibleCheckboxRefs,
      onConfirmFieldConfig,
      setDefaultFields,

      loading,
      items,
      itemsTotal,
      handleSearch,

      handleCreate,
      handleEdit,
      handleDetail,

      loadingDelete,
      visibleDeleteConfirmationModal,
      handleDelete,
      confirmDelete,

      loadingSync,
      handleSync,

      hasPermission,
      snakeToTitle
    }
  }
})
