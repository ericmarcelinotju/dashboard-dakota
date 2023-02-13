import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { PlusIcon } from '@heroicons/vue/solid'
import {
  get as getRoles,
  del as deleteRole
} from '@/api/role'

export default defineComponent({
  components: {
    PlusIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('role')

    const loading = ref(false)
    let stateParams = reactive({})
    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getRoles(params)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.total
        })
        .finally(() => {
          loading.value = false
        })
    }
    onMounted(() => {
      handleSearch(stateParams)
    })

    const handleCreate = () => {
      router.push({ path: `${pages.role.url}/create` })
    }

    const handleEdit = ({ id }) => {
      router.push({ path: `${pages.role.url}/${id}/edit` })
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
      deleteRole(id)
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
      return store.getters['auth/hasPermission']('ROLE', method)
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
