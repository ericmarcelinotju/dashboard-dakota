import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pages } from '@/config'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import components from '@/components'
import { detail as getOrder } from '@/api/order'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Datepicker
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { showDangerNotification } = useDefaultForm('order')

    const params = reactive({})
    const formLoading = ref(false)

    const routeParams = computed(() => route.params || {})

    const initPage = () => {
      formLoading.value = true
      getOrder(routeParams.value.id)
        .then(res => {
          Object.assign(params, res.data)
        })
        .catch(() => {
          showDangerNotification('loaded')
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    onMounted(() => {
      initPage()
    })

    const onUserClick = (id) => {
      router.push({ name: pages.member.edit.name, params: { id } })
    }

    const onProductClick = (id) => {
      router.push({ name: pages.product.edit.name, params: { id } })
    }

    const onStudioClick = (id) => {
      router.push({ name: pages.studio.edit.name, params: { id } })
    }

    const onMovieClick = (id) => {
      router.push({ name: pages.movie.edit.name, params: { id } })
    }

    return {
      routeParams,
      params,
      formLoading,
      onUserClick,
      onProductClick,
      onStudioClick,
      onMovieClick
    }
  }
})
