import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getStudio,
  insert as insertStudio,
  update as updateStudio
} from '@/api/studio'
import { get as getPricings } from '@/api/pricing'

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
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('studio')

    const initialParams = {
      code: null,
      name: null,
      maxSeats: null,
      pricingId: null
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const pricings = ref([])

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getStudio(routeParams.value.id)
        .then(res => {
          const data = {
            ...res.data,
            pricingId: res.data.pricing.id
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
        updateStudio(routeParams.value.id, params)
          .then(() => {
            reset()
            router.push({ path: `${pages.studio.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertStudio(params)
          .then(() => {
            reset()
            router.push({ path: `${pages.studio.url}` })
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

    const hasPermission = (method, module = 'STUDIO') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    onMounted(() => {
      initPage()
      if (hasPermission('GET', 'PRICING')) {
        getPricings()
          .then(res => {
            pricings.value = res.data.data
          })
      }
    })

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      pricings,
      hasPermission
    }
  }
})
