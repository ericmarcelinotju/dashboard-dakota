import { defineComponent, onMounted, computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { EyeIcon, PlusIcon } from '@heroicons/vue/solid'
import {
  get as getLogs,
  del as deleteLog
} from '@/api/log'

export default defineComponent({
  components: {
    EyeIcon,
    PlusIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('log')

    const loading = ref(false)
    let stateParams = reactive({})
    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getLogs({
        ...params,
        type: route.meta.type
      })
        .then(res => {
          items.value = res.data.logs
          itemsTotal.value = res.data.total
        })
        .finally(() => {
          loading.value = false
        })
    }
    onMounted(() => {
      handleSearch(stateParams)
    })
    watch(route, () => {
      handleSearch(stateParams)
    })

    const handleCreate = () => {
      router.push({ path: `${pages.log.url}/create` })
    }

    const handleEdit = ({ id }) => {
      router.push({ path: `${pages.log.url}/${id}/edit` })
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
      deleteLog(id)
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

    const visibleDetailConfirmationModal = ref(false)
    const detailItem = ref({})
    const handleDetail = (data) => {
      visibleDetailConfirmationModal.value = true
      detailItem.value = data
    }

    const hasPermission = (method) => {
      return store.getters['auth/hasPermission']('ROLE', method)
    }

    const title = computed(() => `${route.meta.type.charAt(0).toUpperCase() + route.meta.type.slice(1)} Log`)

    return {
      title,

      fields,
      items,
      itemsTotal,
      loading,
      handleSearch,

      loadingDelete,
      visibleDeleteConfirmationModal,
      handleDelete,
      confirmDelete,

      handleCreate,
      handleEdit,

      visibleDetailConfirmationModal,
      detailItem,
      handleDetail,

      hasPermission
    }
  }
})
