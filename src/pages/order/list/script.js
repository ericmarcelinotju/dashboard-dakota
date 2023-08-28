import { defineComponent, reactive, ref, onMounted, computed, watch } from 'vue'
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
    InputDropdown: components.InputDropdown,
    DefaultTable: components.DefaultTable,
    DefaultSearch: components.DefaultSearch,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    const theater = computed(() => store.getters['auth/theater'])

    const loading = ref(false)
    const params = reactive({
      type: null
    })
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

    watch(params, (val) => {
      handleSearch(val)
    })

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

    const handleCreate = () => {
      router.push({ name: pages.order.create.name })
    }

    const handleDetail = ({ id }) => {
      router.push({ name: pages.order.detail.name, params: { id } })
    }

    const hasPermission = (action, feature = 'order') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    return {
      theater,
      items,
      itemsTotal,
      loading,
      params,
      handleCreate,
      handleSearch,

      orderStatistics,

      fields,

      handleDetail,

      hasPermission
    }
  }
})
