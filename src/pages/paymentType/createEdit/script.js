import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getPaymentType,
  insert as insertPaymentType,
  update as updatePaymentType
} from '@/api/paymentType'
import { convertJsonToFormData } from '@/utils/body'
import PaymentTypeForm from './paymentType/index.vue'
import TheaterForm from './theater/index.vue'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    PaymentTypeForm,
    TheaterForm
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('paymentType')

    const initialState = {
      code: null,
      name: null,
      description: null,
      provider: null,
      clientId: null,
      clientKey: null,
      serverKey: null,
      merchantId: null,
      terminalId: null
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const isUpdate = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!isUpdate.value) return
      formLoading.value = true
      getPaymentType(routeParams.value.id)
        .then(res => {
          const paymentType = { ...res.data }
          Object.assign(initialState, paymentType)
          Object.assign(params, paymentType)
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

    const submit = () => {
      saveLoading.value = true

      const payload = convertJsonToFormData(params)
      if (isUpdate.value) {
        updatePaymentType(routeParams.value.id, payload)
          .then(() => {
            saveSuccess('updated')
          })
          .catch(saveFail)
      } else {
        insertPaymentType(payload)
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(saveFail)
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.paymentType.url}` })
      saveLoading.value = false
      showSuccessNotification(message)
    }

    const saveFail = () => {
      showDangerNotification('saved')
      saveLoading.value = false
    }

    onMounted(() => {
      initPage()
    })

    const tabOptions = computed(() => isUpdate.value
      ? [
        { label: 'Detail Tipe Pembayaran', value: 'payment-type' },
        { label: 'Teater', value: 'theater' }
      ]
      : [
        { label: 'Detail Tipe Pembayaran', value: 'payment-type' }
      ]
    )

    return {
      routeParams,
      isUpdate,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      tabOptions
    }
  }
})
