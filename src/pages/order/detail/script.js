import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pages } from '@/config'
import { useDefaultForm } from '@/composables/default-form'
import components from '@/components'
import { detail as getOrder, pay as payOrder } from '@/api/order'
import { get as getPaymentTypes } from '@/api/paymentType'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    InputDropdown: components.InputDropdown,
    Loading: components.Loading
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('order')

    const params = reactive({})
    const formLoading = ref(false)

    const routeParams = computed(() => route.params || {})

    const initPage = () => {
      formLoading.value = true
      getOrder(routeParams.value.id)
        .then(res => {
          Object.assign(params, res.data)
        })
        .catch(err => {
          showDangerNotification('loaded', err?.response?.data)
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    const paymentTypes = ref([])
    onMounted(() => {
      initPage()

      getPaymentTypes()
        .then(res => {
          paymentTypes.value = res.data.data.filter(item => item.provider === 'cashier')
        })
    })

    const productItems = computed(() => params?.items?.filter(item => item.type === 'product'))
    const ticketItems = computed(() => params?.items?.filter(item => item.type === 'ticket'))

    const onUserClick = (id) => {
      router.push({ name: pages.member.edit.name, params: { id } })
    }

    const onProductClick = (id) => {
      router.push({ name: pages.product.edit.name, params: { id } })
    }

    const onStudioClick = (id) => {
      router.push({ name: pages.studio.edit.name, params: { id } })
    }

    const onMovieClick = (id) => {
      router.push({ name: pages.movie.edit.name, params: { id } })
    }

    const payLoading = ref(false)
    const payForm = reactive({
      paymentTypeId: null
    })
    const submitPayOrder = (id) => {
      payLoading.value = true
      payOrder(routeParams.value.id, payForm)
        .then(() => {
          router.push({ path: `${pages.order.url}` })
          showSuccessNotification('inserted')
        })
        .catch(err => {
          showDangerNotification('saved', err?.response?.data)
        })
        .finally(() => {
          payLoading.value = false
        })
    }

    return {
      routeParams,
      params,
      formLoading,
      productItems,
      ticketItems,
      onUserClick,
      onProductClick,
      onStudioClick,
      onMovieClick,
      paymentTypes,
      payLoading,
      payForm,
      submitPayOrder
    }
  }
})
