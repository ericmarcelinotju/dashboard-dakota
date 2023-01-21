import { ref, defineComponent, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import VueDatepicker from '@vuepic/vue-datepicker'
import components from '@/components'
import { useDefaultSearch } from '@/composables/default-search'
import { useRouter } from 'vue-router'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/solid'
import { get as getBranches } from '@/api/branch'

export default defineComponent({
  name: 'ExtensionSearch',
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    VueDatepicker,
    InputDropdown: components.InputDropdown,
    PopoverInfo: components.PopoverInfo
  },
  emits: ['search'],
  setup(_, context) {
    const router = useRouter()
    const store = useStore()

    const { params, initSearch, submitSearch } = useDefaultSearch(context, router)

    const initialState = {
      branch_id: null
    }
    initSearch(initialState)

    const branches = ref([])

    const hasPermission = (method, module = 'RECORDING') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    const onChangeBranch = () => {
      submitSearch()
    }

    onMounted(() => {
      if (hasPermission('GET', 'BRANCH')) {
        getBranches()
          .then(res => {
            branches.value = res.data.branches
          })
      }
    })

    return {
      params,
      branches,
      onChangeBranch
    }
  }
})
