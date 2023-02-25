import { defineComponent, onMounted, computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import components from '@/components'
import { PlusIcon } from '@heroicons/vue/solid'
import { get as getTheaters } from '@/api/theater'
import { updateWork as updateUserWork } from '@/api/user'
import { workInFields } from '../../config'

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
    user: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const items = ref(props.user.workHistory)
    const itemsTotal = ref(items.value.length)

    const saveLoading = ref(false)
    const params = reactive({
      ...props.user.workIn,
      theaterId: props.user.workIn.theater.id
    })
    const workPeriod = computed({
      get () {
        return [params.startDate, params.endDate]
      },
      set (value) {
        params.startDate = value[0]
        params.endDate = value[1]
      }
    })

    const theaters = ref([])

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
      updateUserWork(props.user.id, { ...params })
        .then(() => {
          showSuccessNotification('updated')
        })
        .catch(() => {
          showDangerNotification('saved')
        })
        .finally(() => {
          saveLoading.value = false
        })
    }

    return {
      fields: workInFields,
      items,
      itemsTotal,

      params,
      workPeriod,
      submit,
      theaters
    }
  }
})
