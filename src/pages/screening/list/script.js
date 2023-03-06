import { defineComponent, computed, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { CogIcon } from '@heroicons/vue/solid'
import {
  get as getScreenings,
  del as deleteScreening
} from '@/api/screening'

export default defineComponent({
  components: {
    CogIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('screening')

    const theater = computed(() => store.getters['auth/theater'])

    const loading = ref(false)
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getScreenings(params)
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
      router.push({ name: pages.screening.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.screening.edit.name, params: { id } })
    }

    const handleEditSeat = ({ id }) => {
      router.push({ name: pages.screening.edit.name + 'seat', params: { id } })
    }

    // Delete screening
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
      deleteScreening(id)
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

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
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
      handleEditSeat,

      loadingDelete,
      visibleDeleteConfirmationModal,
      handleDelete,
      confirmDelete,

      hasPermission
    }
  }
})
