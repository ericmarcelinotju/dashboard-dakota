import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  get as getScreenings,
  save as saveScreenings
} from '@/api/screening'
import { get as getStudios } from '@/api/studio'
import { get as getMovies } from '@/api/movie'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultModal: components.DefaultModal,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputCalendarDay: components.InputCalendarDay,
    Datepicker
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('screening')

    const initialParams = {
      studioId: null,
      date: null,
      times: null,
      screenings: []
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const movies = ref([])
    const studios = ref([])

    const visibleAddScreeningModal = ref(false)
    const onMovieChange = (movieId) => {
      const movie = movies.value.find(movie => movie.id === movieId)
      activeScreening.movie = movie
      activeScreening.movieId = movieId
      params.screenings.push({ ...activeScreening })
      visibleAddScreeningModal.value = false
    }
    const activeMovie = reactive({})
    const activeScreening = reactive({})
    const onCalendarClick = ({ hour, minute }) => {
      activeScreening.hour = hour
      activeScreening.minute = minute
      visibleAddScreeningModal.value = true
    }
    const onEventDelete = (index) => {
      params.screenings.splice(index, 1)
    }
    const events = computed(() => params.screenings.map(screening => ({
      hour: screening.hour,
      minute: screening.minute,
      duration: screening.movie.runTimeNumber / 60,
      title: screening.movie.title,
      detail: `Duration : ${screening.movie.runTimeNumber / 60} minutes`
    })))

    const initScreenings = () => {
      if (!params.studioId || !params.date) return
      formLoading.value = true
      getScreenings({
        studioId: params.studioId,
        date: params.date.toString()
      })
        .then(res => {
          params.screenings = res.data.data.map(screening => ({
            ...screening,
            movieId: screening.movie.id,
            hour: +screening.time.split(':')[0],
            minute: +screening.time.split(':')[1]
          }))
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    watch(() => params.studioId, initScreenings)
    watch(() => params.date, initScreenings)

    const reset = () => {
      Object.assign(params, initialParams)
    }

    const submit = () => {
      saveLoading.value = true
      saveScreenings(params)
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

    const hasPermission = (action, feature = 'screening') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    onMounted(() => {
      // initPage()
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
      visibleAddScreeningModal,
      onMovieChange,
      activeMovie,
      activeScreening,
      onCalendarClick,
      onEventDelete,
      events,
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
