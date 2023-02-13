import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getStudio,
  updateSeat as updateStudioSeat
} from '@/api/studio'
import { get as getPricings } from '@/api/pricing'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('studio')

    const initialParams = {
      seatChart: null,
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getStudio(routeParams.value.id)
        .then(res => {
          Object.assign(initialParams, res.data)
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
      Object.assign(params, initialParams)
    }

    const submit = () => {
      saveLoading.value = true
      updateStudioSeat(routeParams.value.id, params)
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
    }

    const hasPermission = (method, module = 'STUDIO') => {
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
