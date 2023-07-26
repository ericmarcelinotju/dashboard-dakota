import { computed, watch, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { debounce } from 'lodash'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getStudio,
  updateSeat as updateStudioSeat
} from '@/api/studio'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('studio')

    const initialParams = {
      seatChart: null
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const maxSeat = reactive({
      row: 10,
      column: 10
    })

    watch(maxSeat, debounce((val) => {
      for (let i = 0; i < val.row; i++) {
        for (let j = 0; j < val.column; j++) {
          if (!params.seatChart[i]) {
            params.seatChart[i] = []
          }
          if (!params.seatChart[i][j]) {
            params.seatChart[i][j] = 0
          }
        }
      }
    }, 500))

    const isSeatChartValid = computed(() => {
      return params.seatChart && params.seatChart.length >= maxSeat.row && params.seatChart[0].length >= maxSeat.column
    })

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getStudio(routeParams.value.id)
        .then(res => {
          Object.assign(initialParams, res.data)
          Object.assign(params, res.data)
          maxSeat.row = res.data.seatChart.length
          maxSeat.column = res.data.seatChart[0].length
        })
        .catch(err => {
          console.log(err)
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

    const hasPermission = (action, feature = 'studio') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      hasId,
      maxSeat,
      isSeatChartValid,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      hasPermission
    }
  }
})
