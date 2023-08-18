import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { PlusIcon } from '@heroicons/vue/solid'
import {
  get as getUsers,
  del as deleteUser
} from '@/api/user'
import { user as getUserStatistic } from '@/api/statistic'

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
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const loading = ref(false)
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = {
        ...params,
        isCustomer: true
      }
      loading.value = true
      getUsers(stateParams)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }

    const userStatistics = ref({
      activeTotal: 0,
      inActiveTotal: 0,
      newTotal: 0,
      total: 0,
      transactingTotal: 0
    })
    const initStatistics = () => {
      getUserStatistic()
        .then(res => {
          userStatistics.value = res.data
        })
    }

    onMounted(() => {
      handleSearch(stateParams)
      initStatistics()
    })

    const handleCreate = () => {
      router.push({ name: pages.member.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.member.edit.name, params: { id } })
    }

    // Delete user
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
      deleteUser(id)
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

    const hasPermission = (action, feature = 'user') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    return {
      items,
      itemsTotal,
      loading,
      handleSearch,

      userStatistics,

      fields,

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
