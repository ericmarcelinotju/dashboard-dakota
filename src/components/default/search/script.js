import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { SearchIcon } from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'
import { useDefaultSearch } from '@/composables/default-search'
import components from '@/components'
import Datepicker from '@vuepic/vue-datepicker'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DefaultSearch',
  components: {
    SearchIcon,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    Datepicker
  },
  props: {
    fields: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const router = useRouter()
    const store = useStore()

    const selectedField = ref({})

    const params = reactive({
      searchValue: null,
      searchType: null
    })

    const { submitSearch } = useDefaultSearch(context, router)

    const searchableFields = computed(() => props.fields.filter(field => field.searchable || field.filterable))
    const hasSearchableFields = computed(() => searchableFields.value && searchableFields.value.length > 0)

    const initPage = () => {
      const querySelectedField = props.fields.find(field => field.value === params.searchType)
      selectedField.value = querySelectedField
    }

    const search = () => {
      const search = {}
      search[params.searchType] = params.searchValue
      submitSearch(search)
    }

    const submitAction = (type = 'default') => {
      context.emit(type)
    }

    const options = computed(() => {
      return selectedField.value.options || store.getters[selectedField.value.optionKey] || []
    })

    const date = computed({
      get () {
        return params.searchValue
      },
      set (value) {
        params.searchValue = value
      }
    })

    watch(selectedField, (val) => {
      if (val) {
        params.searchType = val.value
        params.searchValue = ''
      }
    })

    onMounted(() => {
      initPage()
    })

    return {
      selectedField,
      params,
      searchableFields,
      hasSearchableFields,
      search,
      submitAction,
      date,
      options
    }
  }
})
