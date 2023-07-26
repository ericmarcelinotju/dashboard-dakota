import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { fields } from '../config'
import components from '@/components'
import { CogIcon, PlusIcon } from '@heroicons/vue/solid'
import { get as getOrders } from '@/api/order'
import { order as getOrderStatistic } from '@/api/statistic'

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

    const loading = ref(false)
    let stateParams = reactive({})

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getOrders(params)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }

    const orderStatistics = ref({
      pendingTotal: 0,
      settleTotal: 0,
      failedTotal: 0,
      total: 0
    })
    const initStatistics = () => {
      getOrderStatistic()
        .then(res => {
          orderStatistics.value = res.data
        })
    }

    onMounted(() => {
      handleSearch(stateParams)
      initStatistics()
    })

    const handleDetail = ({ id }) => {
      router.push({ name: pages.order.detail.name, params: { id } })
    }

    const hasPermission = (action, feature = 'order') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    return {
      items,
      itemsTotal,
      loading,
      handleSearch,

      orderStatistics,

      fields,

      handleDetail,

      hasPermission
    }
  }
})
