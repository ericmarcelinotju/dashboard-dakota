import { computed, onMounted, ref } from 'vue'
import { useDefaultForm } from '@/composables/default-form'
import { capitalizeFirstLetter, toSimplifiedObjectName } from '@/utils/string'

const useViewDetail = (route, store, objectName = '') => {
  const { showDangerNotification } = useDefaultForm(objectName)
  const simplifiedObjectName = toSimplifiedObjectName(objectName)

  const loading = ref(false)

  const routeParams = computed(() => route.params || {})
  const hasId = computed(() => !!routeParams.value.id)
  const data = computed(() => store.getters[`${simplifiedObjectName}/${simplifiedObjectName}`])

  const fetchData = () => {
    if (!hasId.value) return
    loading.value = true
    store.dispatch(`${simplifiedObjectName}/get${capitalizeFirstLetter(simplifiedObjectName)}`, {
      id: routeParams.value.id,
      success: () => {
        loading.value = false
      },
      fail: () => {
        showDangerNotification('loaded')
        loading.value = false
      }
    })
  }

  onMounted(() => {
    fetchData()
  })

  return {
    loading,
    data,
    fetchData
  }
}

export {
  useViewDetail
}
