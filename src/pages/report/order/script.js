import { defineComponent, reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { fields } from './config'
import components from '@/components'
import { useDefaultForm } from '@/composables/default-form'
import Datepicker from '@vuepic/vue-datepicker'
import { DownloadIcon } from '@heroicons/vue/solid'
import { getOrder as getOrderReport, downloadOrder as downloadOrderReport } from '@/api/report'
import { download } from '../../../utils/file'

export default defineComponent({
  components: {
    DownloadIcon,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage,
    InputDropdown: components.InputDropdown,
    Loading: components.Loading,
    Datepicker
  },
  setup () {
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const loading = ref(false)
    let stateParams = reactive({})

    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    const filter = reactive({
      type: null,
      startDate: firstDayOfMonth,
      endDate: today
    })

    const filterPeriod = computed({
      get () {
        return [filter.startDate, filter.endDate]
      },
      set (value) {
        filter.startDate = value[0]
        filter.endDate = value[1]
      }
    })

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = {
        ...params,
        type: filter.type,
        startDate: filter.startDate.toISOString(),
        endDate: filter.endDate.toISOString()
      }
      loading.value = true
      getOrderReport(stateParams)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }
    watch(filter, () => {
      handleSearch(stateParams)
    })

    const downloadLoading = ref(false)
    const handleDownload = () => {
      downloadLoading.value = true
      downloadOrderReport({
        type: filter.type,
        startDate: filter.startDate,
        endDate: filter.endDate
      })
        .then(res => {
          download(res.data, 'test.pdf')
          showSuccessNotification('download')
        })
        .catch(err => {
          if (err?.response?.data) {
            showDangerNotification('download', err?.response?.data)
          } else {
            showDangerNotification('download', err)
          }
        })
        .finally(() => {
          downloadLoading.value = false
        })
    }

    const hasPermission = (action, feature = 'report') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    return {
      items,
      itemsTotal,
      loading,
      handleSearch,

      fields,
      filter,
      filterPeriod,

      downloadLoading,
      handleDownload,

      hasPermission
    }
  }
})
