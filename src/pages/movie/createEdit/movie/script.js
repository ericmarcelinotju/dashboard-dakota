import { computed, defineComponent, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  insert as insertMovie,
  update as updateMovie
} from '@/api/movie'
import { convertJsonToFormData } from '@/utils/body'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputImage: components.InputImage,
    InputVideo: components.InputVideo,
    InputMultitext: components.InputMultitext,
    Datepicker
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    movie: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('movie')

    const params = reactive(props.movie)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const submit = () => {
      saveLoading.value = true

      const formData = convertJsonToFormData({
        ...params,
        releaseDate: params.releaseDate.toISOString()
      })
      if (hasId.value) {
        updateMovie(routeParams.value.id, formData)
          .then(() => {
            router.push({ path: `${pages.movie.url}` })
            showSuccessNotification('updated')
          })
          .catch(err => {
            showDangerNotification('saved', err?.response?.data)
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertMovie(formData)
          .then(() => {
            router.push({ path: `${pages.movie.url}` })
            showSuccessNotification('inserted')
          })
          .catch(err => {
            showDangerNotification('saved', err?.response?.data)
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const hasPermission = (action, feature = 'movie') => {
      return store.getters['auth/hasPermission'](feature, action)
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
