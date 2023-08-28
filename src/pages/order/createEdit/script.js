import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PlusIcon, TrashIcon } from '@heroicons/vue/solid'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getOrder,
  insert as insertOrder,
  update as updateOrder
} from '@/api/order'
import { get as getProducts } from '@/api/product'
import { get as getMovies } from '@/api/movie'
import { get as getScreenings, ticket as getTicket } from '@/api/screening'

export default defineComponent({
  components: {
    PlusIcon,
    TrashIcon,
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('order')

    const initialParams = {
      type: null,
      items: []
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getOrder(routeParams.value.id)
        .then(res => {
          const data = {
            ...res.data,
            weekdayPrice: res.data.weekdayPriceNumber,
            weekendPrice: res.data.weekendPriceNumber,
            holidayPrice: res.data.holidayPriceNumber
          }
          Object.assign(initialParams, data)
          Object.assign(params, data)
        })
        .catch(err => {
          showDangerNotification('loaded', err?.response?.data)
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    const reset = () => {
      Object.assign(params, initialParams)
    }

    const submit = () => {
      saveLoading.value = true
      if (hasId.value) {
        updateOrder(routeParams.value.id, params)
          .then(() => {
            reset()
            router.push({ path: `${pages.order.url}` })
            showSuccessNotification('updated')
          })
          .catch(err => {
            showDangerNotification('saved', err?.response?.data)
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertOrder(params)
          .then(res => {
            reset()
            router.push({ name: pages.order.detail.name, params: { id: res.data.id } })
            showSuccessNotification('inserted')
          })
          .catch(err => {
            showDangerNotification('saved', err?.response?.data)
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const hasPermission = (action, feature = 'order') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    const addItem = () => {
      params.items.push({ qty: 1, type: 'product' })
    }

    const deleteItem = (index) => {
      params.items.splice(index, 1)
    }

    const products = ref([])
    const movies = ref([])

    onMounted(() => {
      initPage()
      getProducts()
        .then(res => {
          products.value = res.data.data
        })
      getMovies()
        .then(res => {
          movies.value = res.data.data
        })
    })

    const onTypeChange = (val) => {
      params.items = []
    }

    const screenings = ref([])
    const onMovieChange = (val) => {
      const now = new Date()
      getScreenings({
        movieId: val,
        date: now.toISOString()
      })
        .then(res => {
          screenings.value = res.data.data
        })
    }

    const tickets = ref([])
    const screening = computed(() => screenings.value.find(screening => screening.id === params.screeningId))
    const onScreeningChange = (val) => {
      getTicket(val)
        .then(res => {
          tickets.value = res.data
        })
    }

    const onCheckSeat = ($event, seat) => {
      if ($event.target.checked) {
        params.items.push({
          screeningId: params.screeningId,
          seatId: seat.id,
          type: 'ticket'
        })
      } else {
        const index = params.items.find(item => item.seatId === seat.id)
        params.items.splice(index, 1)
      }
    }

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      hasPermission,
      products,
      movies,
      screenings,
      screening,
      tickets,
      onTypeChange,
      onMovieChange,
      onScreeningChange,
      onCheckSeat,
      addItem,
      deleteItem
    }
  }
})
