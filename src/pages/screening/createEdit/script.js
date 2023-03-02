import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getScreening,
  insert as insertScreening,
  update as updateScreening
} from '@/api/screening'
import { get as getStudios } from '@/api/studio'
import { get as getMovies } from '@/api/movie'

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
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('screening')

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

    const movies = ref([])
    const studios = ref([])

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getScreening(routeParams.value.id)
        .then(res => {
          const data = {
            ...res.data,
            movieId: res.data.movie.id,
            studioId: res.data.studio.id
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
        updateScreening(routeParams.value.id, params)
          .then(() => {
            reset()
            router.push({ path: `${pages.screening.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertScreening(params)
          .then(() => {
            reset()
            router.push({ path: `${pages.screening.url}` })
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
      getMovies()
        .then(res => {
          movies.value = res.data.data
        })
      getStudios()
        .then(res => {
          studios.value = res.data.data
        })
    })

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      movies,
      studios,
      hasPermission
    }
  }
})
