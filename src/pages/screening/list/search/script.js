import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import VueDatepicker from '@vuepic/vue-datepicker'
import components from '@/components'
import { useDefaultSearch } from '@/composables/default-search'
import { statusOptions, typeOptions } from '../../config'
import { format, isValid } from '@/utils/date'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/solid'
import { get as getBranches } from '@/api/branch'

export default defineComponent({
  name: 'RecordingSearch',
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    VueDatepicker,
    InputDropdown: components.InputDropdown,
    PopoverInfo: components.PopoverInfo
  },
  setup(_, context) {
    const router = useRouter()
    const store = useStore()

    const { params, initSearch, submitSearch } = useDefaultSearch(context, router)

    const defaultEndDate = dayjs().hour(23).minute(59)
    const defaultStartDate = defaultEndDate.subtract(3, 'month')

    const initialState = {
      branch_id: null,
      start_date: format(defaultStartDate),
      end_date: format(defaultEndDate),
      call_from_number: null,
      call_to_number: null,
      call_duration: null,
      talk_duration: null,
      status: null,
      has_recording: false,
      trunk: null,
      type: null,
      pin_code: null,
      is_number_fuzzy_search: false
    }
    initSearch(initialState)

    const branches = ref([])
    const trunks = computed(() => store.getters['recording/trunks'](params.branch_id).map(trunk => ({ label: trunk, value: trunk })))

    const hasPermission = (method, module = 'RECORDING') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    const startDate = computed({
      get() {
        return params.start_date
      },
      set(value) {
        if (isValid(value)) {
          params.start_date = format(value)
        } else {
          params.start_date = null
        }
      }
    })

    const endDate = computed({
      get() {
        return params.end_date
      },
      set(value) {
        if (isValid(value)) {
          params.end_date = format(value)
        } else {
          params.end_date = null
        }
      }
    })

    const onSubmit = () => {
      submitSearch()
    }

    const onChangeBranch = () => {
      store.dispatch('recording/getTrunks', params.branch_id)
    }

    onMounted(() => {
      if (hasPermission('GET', 'BRANCH')) {
        getBranches()
          .then(res => {
            branches.value = res.data.branches
          })
      }
    })

    const isAdvancedSearchOpen = ref(false)
    const onToogleAdvancedSearchOpen = () => {
      isAdvancedSearchOpen.value = !isAdvancedSearchOpen.value
    }

    return {
      params,
      branches,
      trunks,
      statusOptions,
      typeOptions,
      onSubmit,
      startDate,
      endDate,
      isAdvancedSearchOpen,
      onToogleAdvancedSearchOpen,
      onChangeBranch
    }
  }
})
