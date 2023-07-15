import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getMovie,
  insert as insertMovie,
  update as updateMovie
} from '@/api/movie'
import { convertJsonToFormData } from '@/utils/body'
import MovieForm from './movie/index.vue'
import TheaterForm from './theater/index.vue'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    MovieForm,
    TheaterForm
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('movie')

    const initialState = {
      code: null,
      title: null,
      rating: null,
      runTime: null,
      genre: null,
      releaseDate: null,
      casts: null,
      producer: null,
      distributor: null,
      director: null,
      writer: null,
      description: null,
      picture: null,
      trailer: null
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const isUpdate = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!isUpdate.value) return
      formLoading.value = true
      getMovie(routeParams.value.id)
        .then(res => {
          const movie = {
            ...res.data,
            runTime: res.data.runTimeNumber,
            releaseDate: new Date(res.data.releaseDateISO)
          }
          Object.assign(initialState, movie)
          Object.assign(params, movie)
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
        updateMovie(routeParams.value.id, payload)
          .then(() => {
            saveSuccess('updated')
          })
          .catch(saveFail)
      } else {
        insertMovie(payload)
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(saveFail)
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.movie.url}` })
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
          { label: 'Detail Film', value: 'movie' },
          { label: 'Teater', value: 'theater' }
        ]
      : [
          { label: 'Detail Film', value: 'movie' }
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
