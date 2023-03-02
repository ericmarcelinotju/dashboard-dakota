import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getPricing,
  insert as insertPricing,
  update as updatePricing
} from '@/api/pricing'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('pricing')

    const initialParams = {
      code: null,
      name: null,
      weekdayPrice: null,
      weekendPrice: null,
      holidayPrice: null
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getPricing(routeParams.value.id)
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
        .catch(() => {
          showDangerNotification('loaded')
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
        updatePricing(routeParams.value.id, params)
          .then(() => {
            reset()
            router.push({ path: `${pages.pricing.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertPricing(params)
          .then(() => {
            reset()
            router.push({ path: `${pages.pricing.url}` })
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

    const hasPermission = (method, module = 'PRICING') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      hasPermission
    }
  }
})
