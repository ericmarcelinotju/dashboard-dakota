import { computed, defineComponent, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  insert as insertPaymentType,
  update as updatePaymentType
} from '@/api/paymentType'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputImage: components.InputImage,
    Datepicker
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    paymentType: {
      type: Object,
      default: () => { }
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('paymentType')

    const params = reactive(props.paymentType)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const submit = () => {
      saveLoading.value = true

      const payload = { ...params }
      if (hasId.value) {
        updatePaymentType(routeParams.value.id, payload)
          .then(() => {
            router.push({ path: `${pages.paymentType.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertPaymentType(payload)
          .then(() => {
            router.push({ path: `${pages.paymentType.url}` })
            showSuccessNotification('inserted')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const hasPermission = (method, module = 'PAYMENT-TYPE') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    return {
      routeParams,
      hasId,
      params,
      saveLoading,
      submit,
      hasPermission
    }
  }
})
