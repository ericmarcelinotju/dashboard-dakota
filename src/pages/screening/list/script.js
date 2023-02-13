import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import { CogIcon, DownloadIcon, PlayIcon, PlusIcon } from '@heroicons/vue/solid'
import RecordingSearch from './search/index.vue'
import { download as downloadFile } from '@/utils/file'
import { get as getRecordings, del as deleteRecording } from '@/api/recording'

export default defineComponent({
  components: {
    CogIcon,
    DownloadIcon,
    PlayIcon,
    PlusIcon,
    RecordingSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage,
    DefaultSearch: components.DefaultSearch,
    DefaultTable: components.DefaultTable,
    PopoverInfo: components.PopoverInfo
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('recording')

    const loading = ref(false)
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)

    const handleSearch = (params) => {
      if (!params.branch_id) {
        return
      }
      stateParams = { ...params }
      loading.value = true
      getRecordings(params)
        .then(res => {
          items.value = res.data.recordings
          itemsTotal.value = res.data.total
        })
        .finally(() => {
          loading.value = false
        })
    }

    const handleCreate = () => {
      router.push({ name: pages.recording.create.name })
    }

    const handleEdit = ({ id }) => {
      router.push({ name: pages.recording.edit.name, params: { id } })
    }

    // Delete recording
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
      deleteRecording(id, deleteItem.value)
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

    const visiblePlayRecordingModal = ref(false)
    const playRecordingItem = ref({})
    const handlePlay = async (data) => {
      if (loadingDownload.value) {
        return
      }
      loadingDownload.value = true
      playRecordingItem.value = { ...data }
      store.dispatch('recording/downloadRecording', data.id)
        .then((blob) => {
          playRecordingItem.value.recording_file = URL.createObjectURL(blob)
          visiblePlayRecordingModal.value = true
        }).catch(() => {
          showDangerNotification('download')
        }).finally(() => {
          loadingDownload.value = false
        })
    }

    // Download recording
    const loadingDownload = ref(false)
    const handleDownload = async (data) => {
      if (loadingDownload.value) {
        return
      }
      loadingDownload.value = true
      store.dispatch('recording/downloadRecording', data.id)
        .then((blob) => {
          downloadFile(blob, data.recording)
          showSuccessNotification('download')
        })
        .catch(() => {
          showDangerNotification('download')
        }).finally(() => {
          loadingDownload.value = false
        })
    }

    const hasPermission = (method, module = 'RECORDING') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    return {
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

      visiblePlayRecordingModal,
      playRecordingItem,
      handlePlay,

      loadingDownload,
      handleDownload,

      hasPermission
    }
  }
})
