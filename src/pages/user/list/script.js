import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { CogIcon, PlusIcon } from '@heroicons/vue/solid'
import {
  get as getUsers,
  del as deleteUser
} from '@/api/user'

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
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const loading = ref(false)
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getUsers(params)
        .then(res => {
          items.value = res.data.users.filter(user => user.role_name !== 'Super Admin')
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
      router.push({ name: pages.user.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.user.edit.name, params: { id } })
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
        .catch(() => {
          showDangerNotification('deleted')
        })
        .finally(() => {
          loadingDelete.value = false
          visibleDeleteConfirmationModal.value = false
        })
    }

    // Table fields setting
    const copyFields = JSON.parse(JSON.stringify(store.getters['fields/user']))
    const fields = reactive(copyFields)
    const visibleCheckboxRefs = ref([])
    const visibleFieldConfigModal = ref(false)
    const onConfirmFieldConfig = () => {
      for (const checkbox of visibleCheckboxRefs.value) {
        const field = fields.find((field) => field.value === checkbox.id)
        field.hidden = !checkbox.checked
      }
      store.commit('fields/setUser', fields)
    }
    const setDefaultFields = () => {
      store.commit('fields/setDefaultUser')
      Object.assign(fields, JSON.parse(JSON.stringify(store.getters['fields/user'])))
    }

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    return {
      items,
      itemsTotal,
      loading,
      handleSearch,

      fields,
      visibleFieldConfigModal,
      visibleCheckboxRefs,
      onConfirmFieldConfig,
      setDefaultFields,

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
