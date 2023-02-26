import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import components from '@/components'
import { detail as getOrder } from '@/api/order'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Datepicker
  },
  setup () {
    const route = useRoute()
    const { showDangerNotification } = useDefaultForm('movie')

    const initialState = {
      code: null,
      date: null,
      subTotalAmount: null,
      taxAmount: null,
      totalAmount: null,
      user: null,
      payment: null
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const isUpdate = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!isUpdate.value) return
      formLoading.value = true
      getOrder(routeParams.value.id)
        .then(res => {
          Object.assign(initialState, res.data)
          Object.assign(params, res.data)
        })
        .catch(() => {
          showDangerNotification('loaded')
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    const reset = () => {
      Object.assign(params, initialState)
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      isUpdate,
      params,
      formLoading,
      reset
    }
  }
})
