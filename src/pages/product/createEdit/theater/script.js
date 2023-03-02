import { defineComponent, onMounted, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import components from '@/components'
import { pages } from '@/config'
import { PlusIcon } from '@heroicons/vue/solid'
import { get as getTheaters } from '@/api/theater'
import { update as updateProduct } from '@/api/product'
import { theaterFields } from '../../config'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    PlusIcon,
    Datepicker,
    DefaultTable: components.DefaultTable,
    DefaultModal: components.DefaultModal,
    DefaultPage: components.DefaultPage,
    InputDropdown: components.InputDropdown
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('product')

    const items = ref(props.product.theaters)
    const itemsTotal = ref(items.value.length)

    const saveLoading = ref(false)
    const params = reactive({
      theaterId: null,
      theaters: props.product.theaters
    })

    const theaters = ref([])
    const theaterOptions = computed(() => {
      return theaters.value.filter(theater => !params.theaters.find((activeTheater) => activeTheater.id === theater.id))
    })

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    onMounted(() => {
      if (hasPermission('GET', 'THEATER')) {
        getTheaters()
          .then(res => {
            theaters.value = res.data.data
          })
      }
    })

    const submit = () => {
      saveLoading.value = true
      updateProduct(props.product.id, {
        theaterIds: params.theaters.map(item => item.id)
      })
        .then(() => {
          router.push({ path: `${pages.product.url}` })
          showSuccessNotification('updated')
        })
        .catch(() => {
          showDangerNotification('saved')
        })
        .finally(() => {
          saveLoading.value = false
        })
    }

    const addTheater = () => {
      const choosenTheater = theaters.value.find(item => item.id === params.theaterId)
      params.theaters.push(choosenTheater)
    }

    const removeTheater = (theater) => {
      const choosenIndex = theaters.value.indexOf(item => item.id === params.theaterId)
      console.log(choosenIndex)
      params.theaters.splice(choosenIndex, 1)
    }

    return {
      fields: theaterFields,
      items,
      itemsTotal,

      params,
      submit,
      theaterOptions,
      addTheater,
      removeTheater
    }
  }
})
