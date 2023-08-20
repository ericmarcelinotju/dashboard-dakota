import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { PlusIcon } from '@heroicons/vue/solid'
import {
  get as getMovies,
  del as deleteMovie
} from '@/api/movie'

export default defineComponent({
  name: 'MovieList',
  components: {
    PlusIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage,
    DefaultTabs: components.DefaultTabs
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const {
      showSuccessNotification,
      showDangerNotification
    } = useDefaultForm('movie')

    const theater = computed(() => store.getters['auth/theater'])

    const loading = ref(false)
    let stateParams = reactive({})
    const items = ref([])
    const itemsTotal = ref(0)

    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getMovies(params)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }

    const handleCreate = () => {
      router.push({ name: pages.movie.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.movie.edit.name, params: { id } })
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
      deleteMovie(id)
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

    const hasPermission = (action, feature = 'movie') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    onMounted(() => {
      handleSearch(stateParams)
    })

    return {
      theater,
      fields,

      loading,
      items,
      itemsTotal,
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
