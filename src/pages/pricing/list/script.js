import { defineComponent, computed, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { CogIcon, PlusIcon } from '@heroicons/vue/solid'
import {
  get as getPricings,
  del as deletePricing
} from '@/api/pricing'

export default defineComponent({
  components: {
    CogIcon,
    PlusIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('pricing')

    const theater = computed(() => store.getters['auth/theater'])

    const loading = ref(false)
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getPricings(params)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      handleSearch(stateParams)
    })

    const handleCreate = () => {
      router.push({ name: pages.pricing.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.pricing.edit.name, params: { id } })
    }

    // Delete pricing
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
      deletePricing(id)
        .then(() => {
          handleSearch(stateParams)
          showSuccessNotification('deleted')
        })
        .catch(err => {
          showDangerNotification('deleted', err?.response?.data)
        })
        .finally(() => {
          loadingDelete.value = false
          visibleDeleteConfirmationModal.value = false
        })
    }

    const hasPermission = (action, feature = 'pricing') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    return {
      theater,

      fields,
      items,
      itemsTotal,
      loading,
      handleSearch,

      handleCreate,
      handleEdit,

      loadingDelete,
      visibleDeleteConfirmationModal,
      handleDelete,
      confirmDelete,

      hasPermission
    }
  }
})
