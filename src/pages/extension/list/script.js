import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import ExtensionSearch from './search/index.vue'
import { useDefaultForm } from '@/composables/default-form'
import { RefreshIcon } from '@heroicons/vue/solid'
import { get as getExtensions, del as deleteExtension } from '@/api/extension'

export default defineComponent({
  name: 'ExtensionList',
  components: {
    RefreshIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage,
    ExtensionSearch
  },
  setup (_, context) {
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('extension')

    const loading = ref(false)
    const loadingDelete = ref(false)
    const visibleDeleteConfirmationModal = ref(false)
    const deleteItem = ref({})
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)

    const handleSearch = (params) => {
      if (!params.branch_id) {
        return
      }
      stateParams = { ...params }
      loading.value = true
      getExtensions(params)
        .then(res => {
          items.value = res.data.extensions
          itemsTotal.value = res.data.total
        })
        .finally(() => {
          loading.value = false
        })
    }

    const handleCreate = () => {
      router.push({ name: pages.extension.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.extension.edit.name, params: { id } })
    }

    const handleDelete = (data) => {
      visibleDeleteConfirmationModal.value = true
      deleteItem.value = data
    }

    const confirmDelete = () => {
      const { id } = deleteItem.value
      loadingDelete.value = true
      deleteExtension(id)
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

    const hasPermission = (method) => {
      return store.getters['auth/hasPermission']('PERMISSION', method)
    }

    return {
      fields,
      items,
      itemsTotal,
      loading,
      loadingDelete,
      visibleDeleteConfirmationModal,
      handleSearch,
      handleCreate,
      handleEdit,
      handleDelete,
      confirmDelete,
      hasPermission
    }
  }
})
