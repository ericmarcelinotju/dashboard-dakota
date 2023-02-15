import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getMovie,
  insert as insertMovie,
  update as updateMovie
} from '@/api/movie'
import { convertJsonToFormData } from '@/utils/body'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputImage: components.InputImage,
    InputVideo: components.InputVideo,
    InputMultitext: components.InputMultitext,
    Datepicker
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
      actors: null,
      actresses: null,
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

    return {
      routeParams,
      isUpdate,
      params,
      formLoading,
      saveLoading,
      submit,
      reset
    }
  }
})
